// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title Marketplace
 * @dev NFT marketplace for buying and selling NFTs using NCT tokens
 */
contract Marketplace is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public nctToken;
    uint256 public platformFeePercent = 250; // 2.5%
    address public feeRecipient;

    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }

    // NFT Contract => Token ID => Listing
    mapping(address => mapping(uint256 => Listing)) public listings;

    // Events
    event NFTListed(address indexed nftContract, uint256 indexed tokenId, address indexed seller, uint256 price);
    event NFTUnlisted(address indexed nftContract, uint256 indexed tokenId, address indexed seller);
    event NFTSold(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed seller,
        address buyer,
        uint256 price
    );
    event PlatformFeeUpdated(uint256 newFeePercent);

    constructor(address _nctToken, address _feeRecipient) {
        nctToken = IERC20(_nctToken);
        feeRecipient = _feeRecipient;
    }

    /**
     * @dev List an NFT for sale
     */
    function listNFT(address nftContract, uint256 tokenId, uint256 price) external nonReentrant {
        require(price > 0, "Price must be greater than 0");
        require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "Not NFT owner");

        listings[nftContract][tokenId] = Listing({seller: msg.sender, price: price, active: true});

        emit NFTListed(nftContract, tokenId, msg.sender, price);
    }

    /**
     * @dev Cancel a listing
     */
    function cancelListing(address nftContract, uint256 tokenId) external nonReentrant {
        Listing storage listing = listings[nftContract][tokenId];
        require(listing.active, "Listing not active");
        require(listing.seller == msg.sender, "Not listing owner");

        listing.active = false;

        emit NFTUnlisted(nftContract, tokenId, msg.sender);
    }

    /**
     * @dev Buy an NFT
     */
    function buyNFT(address nftContract, uint256 tokenId) external nonReentrant {
        Listing storage listing = listings[nftContract][tokenId];
        require(listing.active, "Listing not active");

        address seller = listing.seller;
        uint256 price = listing.price;

        // Calculate fees
        uint256 platformFee = (price * platformFeePercent) / 10000;
        uint256 sellerAmount = price - platformFee;

        // Mark listing as inactive
        listing.active = false;

        // Transfer NCT from buyer to seller and fee recipient
        nctToken.safeTransferFrom(msg.sender, seller, sellerAmount);
        if (platformFee > 0) {
            nctToken.safeTransferFrom(msg.sender, feeRecipient, platformFee);
        }

        // Transfer NFT from seller to buyer
        IERC721(nftContract).safeTransferFrom(seller, msg.sender, tokenId);

        emit NFTSold(nftContract, tokenId, seller, msg.sender, price);
    }

    /**
     * @dev Get listing details
     */
    function getListing(address nftContract, uint256 tokenId) external view returns (Listing memory) {
        return listings[nftContract][tokenId];
    }

    /**
     * @dev Update platform fee
     */
    function setPlatformFee(uint256 _newFeePercent) external onlyOwner {
        require(_newFeePercent <= 1000, "Fee too high"); // Max 10%
        platformFeePercent = _newFeePercent;
        emit PlatformFeeUpdated(_newFeePercent);
    }

    /**
     * @dev Update fee recipient
     */
    function setFeeRecipient(address _newRecipient) external onlyOwner {
        require(_newRecipient != address(0), "Invalid address");
        feeRecipient = _newRecipient;
    }

    /**
     * @dev Emergency withdraw
     */
    function emergencyWithdraw(address token) external onlyOwner {
        uint256 balance = IERC20(token).balanceOf(address(this));
        IERC20(token).safeTransfer(owner(), balance);
    }
}
