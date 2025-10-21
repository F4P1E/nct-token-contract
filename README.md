# Neo-Culture Token (NCT) Ecosystem

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/solidity-0.8.20-brightgreen.svg)
![Hardhat](https://img.shields.io/badge/hardhat-2.19.0-yellow.svg)
![Next.js](https://img.shields.io/badge/next.js-15.5-black.svg)

**Neo-Culture Token (NCT)** is a production-ready Web3 ecosystem built for the Neo-Culture Tech community. It features token swaps, NFT marketplace, reward distribution, and a comprehensive dashboard—all optimized for testnet deployment.

## Features

### Smart Contracts
- **ERC-20 Token**: Fully compliant with minting, burning, and pausable functionality
- **SwapRouter**: Secure token swaps with slippage protection and fee management
- **ClubNFT**: ERC-721 NFT contract for community members
- **Marketplace**: NFT trading using NCT with platform fees
- **RewardManager**: Activity-based reward distribution system

### Frontend
- **Swap Interface** (`/swap`): Exchange NCT and other ERC-20 tokens
- **NFT Marketplace** (`/market`): Browse and purchase NFTs
- **NFT Minting** (`/mint`): Create and upload NFTs to IPFS
- **Rewards Dashboard** (`/rewards`): Track and claim community rewards
- **User Profile** (`/profile`): View wallet balances, NFT gallery, and transaction history
- **Web3 Integration**: Wagmi + Viem + RainbowKit for seamless wallet connection

## Quick Start

### Prerequisites
- Node.js v18+ and npm
- Testnet wallet with test ETH (get from [Sepolia Faucet](https://sepoliafaucet.com))
- Alchemy or Infura RPC endpoint (optional but recommended)

### Installation

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd neo-culture-token

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
\`\`\`

### Environment Setup

Edit `.env.local` with your configuration:

\`\`\`env
# Web3 Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_NCT_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_SWAP_ROUTER_ADDRESS=0x...
NEXT_PUBLIC_MARKETPLACE_ADDRESS=0x...
NEXT_PUBLIC_CLUB_NFT_ADDRESS=0x...
NEXT_PUBLIC_REWARD_MANAGER_ADDRESS=0x...

# Smart Contract Deployment
PRIVATE_KEY=your_testnet_private_key_here
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
ETHERSCAN_API_KEY=your_etherscan_api_key
\`\`\`

### Development

\`\`\`bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
\`\`\`

### Smart Contract Development

\`\`\`bash
# Compile contracts
npm run compile

# Run tests
npm run test

# Run tests with gas reporting
npm run test:gas

# Generate coverage report
npm run test:coverage
\`\`\`

## Deployment

### Deploy to Sepolia Testnet

\`\`\`bash
# Deploy NCT token (if not already deployed)
npm run deploy:sepolia

# Deploy ecosystem contracts
npm run deploy:ecosystem:sepolia

# Setup ecosystem configuration
npm run setup:ecosystem:sepolia
\`\`\`

### Deploy Frontend to Vercel

\`\`\`bash
npm run build
vercel deploy
\`\`\`

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## Project Structure

\`\`\`
neo-culture-token/
├── contracts/                 # Solidity smart contracts
│   ├── NeoCultureToken.sol
│   ├── SwapRouter.sol
│   ├── ClubNFT.sol
│   ├── Marketplace.sol
│   └── RewardManager.sol
├── scripts/                   # Deployment and setup scripts
│   ├── deploy.js
│   ├── deploy-ecosystem.js
│   └── setup-ecosystem.js
├── test/                      # Contract tests
│   ├── NeoCultureToken.test.js
│   ├── SwapRouter.test.js
│   ├── Marketplace.test.js
│   └── RewardManager.test.js
├── app/                       # Next.js app directory
│   ├── page.tsx              # Home page
│   ├── swap/                 # Swap interface
│   ├── market/               # NFT marketplace
│   ├── mint/                 # NFT minting
│   ├── rewards/              # Rewards dashboard
│   ├── profile/              # User profile
│   └── layout.tsx
├── components/               # React components
│   ├── web3/                 # Web3 integration
│   ├── swap/                 # Swap components
│   ├── market/               # Marketplace components
│   ├── rewards/              # Rewards components
│   ├── profile/              # Profile components
│   └── ui/                   # shadcn/ui components
├── lib/                      # Utilities and helpers
│   ├── web3/                 # Web3 utilities
│   └── utils.ts
├── public/                   # Static assets
├── hardhat.config.js         # Hardhat configuration
├── package.json
├── tsconfig.json
└── README.md
\`\`\`

## Testing

### Run All Tests

\`\`\`bash
npm run test
\`\`\`

### Test Coverage

\`\`\`bash
npm run test:coverage
\`\`\`

### Manual Testing Checklist

- [ ] Connect wallet with MetaMask
- [ ] Swap tokens on `/swap`
- [ ] Browse NFTs on `/market`
- [ ] Mint NFT on `/mint`
- [ ] Claim rewards on `/rewards`
- [ ] View profile on `/profile`

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for comprehensive testing documentation.

## Security

- **OpenZeppelin Contracts**: Uses audited, battle-tested code
- **Reentrancy Protection**: Guards against reentrancy attacks
- **Access Control**: Proper authorization checks on all admin functions
- **Input Validation**: All inputs validated before processing
- **SafeERC20**: Safe token transfer patterns
- **Max Supply Cap**: Prevents unlimited inflation

## Gas Optimization

- Compiler optimization enabled (200 runs)
- Efficient storage layout
- Minimal external calls
- Optimized for deployment cost vs runtime balance

## Modules Overview

### NeoSwap
Token exchange with slippage protection, fee management, and support for multiple token pairs.

### NeoMarket
NFT marketplace supporting listing, buying, and canceling with NCT payments and platform fees.

### NeoRewards
Activity-based reward system tracking community participation and distributing NCT tokens.

### User Profile
Comprehensive dashboard showing wallet balances, owned NFTs, transaction history, and portfolio value.

## Environment Variables

### Required for Frontend
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`: WalletConnect project ID
- `NEXT_PUBLIC_NCT_TOKEN_ADDRESS`: Deployed NCT token address
- `NEXT_PUBLIC_SWAP_ROUTER_ADDRESS`: Deployed SwapRouter address
- `NEXT_PUBLIC_MARKETPLACE_ADDRESS`: Deployed Marketplace address
- `NEXT_PUBLIC_CLUB_NFT_ADDRESS`: Deployed ClubNFT address
- `NEXT_PUBLIC_REWARD_MANAGER_ADDRESS`: Deployed RewardManager address

### Required for Smart Contract Deployment
- `PRIVATE_KEY`: Testnet wallet private key (NEVER use mainnet keys)
- `SEPOLIA_RPC_URL`: Ethereum Sepolia RPC endpoint
- `ETHERSCAN_API_KEY`: For contract verification

## Roadmap

- [ ] Staking functionality
- [ ] Governance features
- [ ] Token vesting contracts
- [ ] Cross-chain deployment
- [ ] Advanced NFT features (royalties, collections)
- [ ] DAO integration

## Support

For issues and questions:
- Open an issue on GitHub
- Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Review [TESTING_GUIDE.md](./TESTING_GUIDE.md)

## License

This project is licensed under the MIT License. See LICENSE file for details.

## Disclaimer

This contract is provided as-is for testnet use. Always conduct thorough audits before deploying to mainnet. Never use mainnet private keys in development environments.

---

**Built with ❤️ by Neo-Culture Tech**

*Innovating through decentralized systems.*
