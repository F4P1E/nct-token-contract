// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NeoCultureToken
 * @dev ERC-20 token for Neo-Culture Tech ecosystem
 * @notice This contract implements a pausable, burnable ERC-20 token with minting capabilities
 * 
 * Features:
 * - Minting: Only owner can mint new tokens
 * - Burning: Token holders can burn their own tokens
 * - Pausing: Owner can pause all token transfers in emergency situations
 * - Ownership: Transferable ownership for contract management
 * 
 * Security:
 * - Uses OpenZeppelin's battle-tested contracts
 * - Follows checks-effects-interactions pattern
 * - Protected admin functions with onlyOwner modifier
 */
contract NeoCultureToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable {
    
    /// @dev Maximum supply cap to prevent unlimited inflation (100 million NCT)
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10**18;
    
    /// @dev Emitted when tokens are minted
    event TokensMinted(address indexed to, uint256 amount);
    
    /// @dev Emitted when contract is paused
    event ContractPaused(address indexed by);
    
    /// @dev Emitted when contract is unpaused
    event ContractUnpaused(address indexed by);

    /**
     * @dev Constructor that gives msg.sender an initial supply
     * @param initialSupply The initial token supply to mint to deployer
     */
    constructor(uint256 initialSupply) ERC20("Neo-Culture Token", "NCT") Ownable(msg.sender) {
        require(initialSupply <= MAX_SUPPLY, "Initial supply exceeds max supply");
        if (initialSupply > 0) {
            _mint(msg.sender, initialSupply);
            emit TokensMinted(msg.sender, initialSupply);
        }
    }

    /**
     * @dev Mints new tokens to a specified address
     * @param to The address that will receive the minted tokens
     * @param amount The amount of tokens to mint (in wei units)
     * 
     * Requirements:
     * - Only owner can call this function
     * - Total supply after minting must not exceed MAX_SUPPLY
     * - Contract must not be paused
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Cannot mint to zero address");
        require(amount > 0, "Amount must be greater than zero");
        require(totalSupply() + amount <= MAX_SUPPLY, "Minting would exceed max supply");
        
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /**
     * @dev Pauses all token transfers
     * @notice Can only be called by the contract owner
     * 
     * Use cases:
     * - Emergency situations
     * - Security incidents
     * - Maintenance periods
     */
    function pause() external onlyOwner {
        _pause();
        emit ContractPaused(msg.sender);
    }

    /**
     * @dev Unpauses all token transfers
     * @notice Can only be called by the contract owner
     */
    function unpause() external onlyOwner {
        _unpause();
        emit ContractUnpaused(msg.sender);
    }

    /**
     * @dev Hook that is called before any transfer of tokens
     * @notice Implements pausable functionality
     */
    function _update(
        address from,
        address to,
        uint256 value
    ) internal virtual override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }

    /**
     * @dev Returns the number of decimals used for token amounts
     * @return uint8 The number of decimals (18)
     */
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
