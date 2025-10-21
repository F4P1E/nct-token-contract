// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title RewardManager
 * @dev Manages reward distribution for community activities
 * Tracks claimable and claimed rewards for users
 */
contract RewardManager is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public nctToken;

    // User reward tracking
    mapping(address => uint256) public claimableRewards;
    mapping(address => uint256) public claimedRewards;

    // Activity types and their reward amounts
    mapping(bytes32 => uint256) public activityRewards;

    // Events
    event RewardAdded(address indexed user, uint256 amount, string reason);
    event RewardClaimed(address indexed user, uint256 amount);
    event ActivityRewardSet(string indexed activityType, uint256 rewardAmount);
    event RewardRecovered(uint256 amount);

    constructor(address _nctToken) {
        nctToken = IERC20(_nctToken);

        // Set default activity rewards
        activityRewards[keccak256("MINT_NFT")] = 10e18; // 10 NCT
        activityRewards[keccak256("SELL_NFT")] = 5e18; // 5 NCT
        activityRewards[keccak256("SWAP_TOKEN")] = 2e18; // 2 NCT
        activityRewards[keccak256("ATTEND_EVENT")] = 15e18; // 15 NCT
        activityRewards[keccak256("COMMUNITY_POST")] = 3e18; // 3 NCT
    }

    /**
     * @dev Add reward to user (only owner)
     */
    function addReward(address user, uint256 amount, string memory reason) external onlyOwner {
        require(user != address(0), "Invalid user address");
        require(amount > 0, "Amount must be greater than 0");

        claimableRewards[user] += amount;

        emit RewardAdded(user, amount, reason);
    }

    /**
     * @dev Add reward based on activity type
     */
    function addActivityReward(address user, string memory activityType) external onlyOwner {
        require(user != address(0), "Invalid user address");

        bytes32 activityHash = keccak256(abi.encodePacked(activityType));
        uint256 rewardAmount = activityRewards[activityHash];

        require(rewardAmount > 0, "Activity type not found or has no reward");

        claimableRewards[user] += rewardAmount;

        emit RewardAdded(user, rewardAmount, activityType);
    }

    /**
     * @dev Batch add rewards to multiple users
     */
    function batchAddRewards(address[] calldata users, uint256[] calldata amounts, string memory reason)
        external
        onlyOwner
    {
        require(users.length == amounts.length, "Array length mismatch");

        for (uint256 i = 0; i < users.length; i++) {
            require(users[i] != address(0), "Invalid user address");
            require(amounts[i] > 0, "Amount must be greater than 0");

            claimableRewards[users[i]] += amounts[i];

            emit RewardAdded(users[i], amounts[i], reason);
        }
    }

    /**
     * @dev Claim available rewards
     */
    function claimRewards() external nonReentrant {
        uint256 claimable = claimableRewards[msg.sender];
        require(claimable > 0, "No rewards to claim");

        // Update state before transfer (checks-effects-interactions)
        claimableRewards[msg.sender] = 0;
        claimedRewards[msg.sender] += claimable;

        // Transfer rewards
        nctToken.safeTransfer(msg.sender, claimable);

        emit RewardClaimed(msg.sender, claimable);
    }

    /**
     * @dev Get user's total rewards (claimable + claimed)
     */
    function getTotalRewards(address user) external view returns (uint256) {
        return claimableRewards[user] + claimedRewards[user];
    }

    /**
     * @dev Get user's claimable rewards
     */
    function getClaimableRewards(address user) external view returns (uint256) {
        return claimableRewards[user];
    }

    /**
     * @dev Get user's claimed rewards
     */
    function getClaimedRewards(address user) external view returns (uint256) {
        return claimedRewards[user];
    }

    /**
     * @dev Set reward amount for an activity type
     */
    function setActivityReward(string memory activityType, uint256 rewardAmount) external onlyOwner {
        require(rewardAmount > 0, "Reward amount must be greater than 0");

        bytes32 activityHash = keccak256(abi.encodePacked(activityType));
        activityRewards[activityHash] = rewardAmount;

        emit ActivityRewardSet(activityType, rewardAmount);
    }

    /**
     * @dev Get reward amount for an activity type
     */
    function getActivityReward(string memory activityType) external view returns (uint256) {
        bytes32 activityHash = keccak256(abi.encodePacked(activityType));
        return activityRewards[activityHash];
    }

    /**
     * @dev Emergency recover tokens
     */
    function recoverTokens(uint256 amount) external onlyOwner {
        nctToken.safeTransfer(owner(), amount);
        emit RewardRecovered(amount);
    }
}
