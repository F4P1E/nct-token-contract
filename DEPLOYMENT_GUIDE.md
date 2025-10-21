# NCT Ecosystem Deployment Guide

This guide walks you through deploying the complete Neo-Culture Token ecosystem to Sepolia testnet.

## Prerequisites

1. **Node.js** (v16+) and npm installed
2. **Hardhat** project set up
3. **Testnet ETH** for gas fees (get from [Sepolia Faucet](https://sepoliafaucet.com))
4. **Environment variables** configured in `.env`

## Environment Setup

Create a `.env` file with the following variables:

\`\`\`env
# Private Key (NEVER commit this!)
PRIVATE_KEY=your_testnet_private_key_here

# RPC URLs
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
AMOY_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/YOUR_ALCHEMY_KEY

# Block Explorer API Keys
ETHERSCAN_API_KEY=your_etherscan_api_key
POLYGONSCAN_API_KEY=your_polygonscan_api_key

# Web3 Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_NCT_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_SWAP_ROUTER_ADDRESS=0x...
NEXT_PUBLIC_MARKETPLACE_ADDRESS=0x...
NEXT_PUBLIC_CLUB_NFT_ADDRESS=0x...
NEXT_PUBLIC_REWARD_MANAGER_ADDRESS=0x...

# Optional: Gas Reporter
REPORT_GAS=true
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key
\`\`\`

## Step 1: Compile Contracts

\`\`\`bash
npm run compile
\`\`\`

This compiles all Solidity contracts and generates ABIs.

## Step 2: Run Local Tests

\`\`\`bash
npm run test
\`\`\`

Verify all contracts work correctly before deploying to testnet.

## Step 3: Deploy to Sepolia Testnet

### Deploy NCT Token (if not already deployed)

\`\`\`bash
npx hardhat run scripts/deploy.js --network sepolia
\`\`\`

This deploys the NCT token contract and outputs the contract address.

### Deploy Ecosystem Contracts

\`\`\`bash
npx hardhat run scripts/deploy-ecosystem.js --network sepolia
\`\`\`

This deploys:
- **SwapRouter** - Token swap functionality
- **ClubNFT** - ERC-721 NFT contract
- **Marketplace** - NFT trading with NCT
- **RewardManager** - Reward distribution

The deployment addresses are saved to `deployments/sepolia-ecosystem.json`.

### Setup Ecosystem

\`\`\`bash
npx hardhat run scripts/setup-ecosystem.js --network sepolia
\`\`\`

This configures:
- Token pairs in SwapRouter
- Platform fees in Marketplace
- Activity rewards in RewardManager

## Step 4: Verify Contracts on Etherscan

Contracts are automatically verified during deployment. To manually verify:

\`\`\`bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
\`\`\`

Example:
\`\`\`bash
npx hardhat verify --network sepolia 0x1234567890123456789012345678901234567890 0xdeployer_address
\`\`\`

## Step 5: Update Frontend Environment Variables

Copy the deployed contract addresses from `deployments/sepolia-ecosystem.json` to your `.env.local`:

\`\`\`env
NEXT_PUBLIC_NCT_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_SWAP_ROUTER_ADDRESS=0x...
NEXT_PUBLIC_MARKETPLACE_ADDRESS=0x...
NEXT_PUBLIC_CLUB_NFT_ADDRESS=0x...
NEXT_PUBLIC_REWARD_MANAGER_ADDRESS=0x...
\`\`\`

## Step 6: Deploy Frontend to Vercel

\`\`\`bash
npm run build
vercel deploy
\`\`\`

## Testing the Ecosystem

### 1. Test Token Swaps

- Visit `/swap`
- Connect wallet
- Select token pair
- Execute swap

### 2. Test NFT Marketplace

- Visit `/mint` to create NFT
- Visit `/market` to browse listings
- Buy NFTs using NCT

### 3. Test Rewards

- Visit `/rewards`
- View claimable rewards
- Claim rewards

### 4. View Profile

- Visit `/profile`
- Check wallet balances
- View NFT gallery
- Review transaction history

## Troubleshooting

### "Insufficient funds for gas"
- Get more testnet ETH from [Sepolia Faucet](https://sepoliafaucet.com)

### "Contract verification failed"
- Wait 30 seconds after deployment before verifying
- Check Etherscan API key is correct

### "Transaction reverted"
- Check contract addresses are correct
- Verify token approvals are set
- Ensure sufficient token balance

### "RPC URL error"
- Verify SEPOLIA_RPC_URL is correct
- Check Alchemy API key is valid
- Ensure network is not rate-limited

## Gas Optimization

To see gas usage for each function:

\`\`\`bash
REPORT_GAS=true npm run test
\`\`\`

## Security Checklist

- [ ] Private key never committed to git
- [ ] All contracts verified on Etherscan
- [ ] Testnet addresses used (not mainnet)
- [ ] Access controls properly configured
- [ ] Reentrancy guards in place
- [ ] SafeERC20 used for token transfers

## Next Steps

1. **Mainnet Deployment** - Update RPC URLs and deploy to Ethereum mainnet
2. **DAO Governance** - Add governance token and voting
3. **Staking** - Implement staking rewards
4. **Cross-chain** - Deploy to multiple chains using bridges

## Support

For issues or questions:
- Check [Hardhat Docs](https://hardhat.org/docs)
- Review [OpenZeppelin Docs](https://docs.openzeppelin.com/)
- Visit [Ethereum Stack Exchange](https://ethereum.stackexchange.com/)
