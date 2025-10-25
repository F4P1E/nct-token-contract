# Neo-Culture Token (NCT) Ecosystem

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)  
[![Solidity](https://img.shields.io/badge/Solidity-^0.8.x-blue.svg)]() [![Hardhat](https://img.shields.io/badge/Hardhat-v2-purple.svg)]() [![Next.js](https://img.shields.io/badge/Next.js-v14-black.svg)]()  

**Neo-Culture Token (NCT)** is a production-ready Web3 ecosystem built for the Neo Culture Tech community. It features token swaps, an NFT marketplace, reward distribution, and a comprehensive dashboard — all optimized for testnet deployment.

---

## 📌 Features

### Smart Contracts
- ERC-20 Token: Fully compliant with minting, burning, pausable functionality  
- SwapRouter: Secure token swaps with slippage protection and fee management  
- ClubNFT: ERC-721 NFT contract for community members  
- Marketplace: NFT trading using NCT with platform fee handling  
- RewardManager: Activity-based reward distribution system  

### Frontend
- Swap Interface (`/swap`): Exchange NCT and other ERC-20 tokens  
- NFT Marketplace (`/market`): Browse & purchase NFTs  
- NFT Minting (`/mint`): Create and upload NFTs to IPFS  
- Rewards Dashboard (`/rewards`): Track & claim community rewards  
- User Profile (`/profile`): View wallet balances, NFT gallery & transaction history  
- Web3 Integration: Using Wagmi + Viem + RainbowKit for seamless wallet connection  

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ and npm (or yarn/pnpm)  
- A testnet wallet with test ETH (e.g., via Sepolia faucet)  
- Alchemy or Infura RPC endpoint (optional but recommended)  

### Installation
```bash
# Clone the repository
git clone https://github.com/F4P1E/nct-token-contract.git
cd nct-token-contract

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
````

### Environment Setup

Edit `.env.local` with your configuration:

```env
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
```

### Development

```bash
# Start the frontend dev server
npm run dev

# Navigate to http://localhost:3000 in your browser
```

### Smart Contract Workflow

```bash
# Compile contracts
npm run compile

# Run all tests
npm run test

# Run tests with gas usage reporting
npm run test:gas

# Generate coverage report
npm run test:coverage
```

---

## 📦 Deployment

### Deploy to Sepolia Testnet

```bash
# Deploy NCT token (if not already deployed)
npm run deploy:sepolia

# Deploy the full ecosystem contracts
npm run deploy:ecosystem:sepolia

# Run setup scripts for ecosystem configuration
npm run setup:ecosystem:sepolia
```

### Deploy Frontend (e.g. to Vercel)

```bash
npm run build
# Follow your hosting provider’s steps (e.g. `vercel deploy`)
```

> For detailed instructions, consult [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

---

## 📁 Project Structure

```
nct-token-contract/
├── contracts/                # Solidity smart contracts
│   ├── NeoCultureToken.sol
│   ├── SwapRouter.sol
│   ├── ClubNFT.sol
│   ├── Marketplace.sol
│   └── RewardManager.sol
├── scripts/                  # Deployment & setup scripts
│   ├── deploy.js
│   ├── deploy-ecosystem.js
│   └── setup-ecosystem.js
├── test/                     # Contract tests
│   ├── NeoCultureToken.test.js
│   ├── SwapRouter.test.js
│   ├── Marketplace.test.js
│   └── RewardManager.test.js
├── app/                      # Next.js frontend application
│   ├── page.tsx              # Home page
│   ├── swap/
│   ├── market/
│   ├── mint/
│   ├── rewards/
│   ├── profile/
│   └── layout.tsx
├── components/               # React UI & Web3 components
│   ├── web3/
│   ├── swap/
│   ├── market/
│   ├── rewards/
│   └── profile/
├── lib/                      # Utilities and helpers
│   ├── web3/
│   └── utils.ts
├── public/                   # Static assets
├── hardhat.config.js         # Hardhat configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧪 Testing

### Run all tests

```bash
npm run test
```

### View test coverage

```bash
npm run test:coverage
```

### Manual Testing Checklist

* Connect wallet using MetaMask or supported wallet
* Swap tokens on `/swap`
* Browse NFTs on `/market`
* Mint an NFT via `/mint`
* Claim rewards via `/rewards`
* View your profile on `/profile`

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for in-depth testing documentation.

---

## 🔐 Security

* Uses audited, battle-tested code from OpenZeppelin (ERC-20, ERC-721)
* Reentrancy protection mechanisms in place
* Role-based access control for admin functions
* Input validation on all external interactions
* SafeERC20 patterns for secure token transfers
* Cap on maximum supply to prevent uncontrolled inflation

---

## ⚙️ Gas & Performance Optimizations

* Compiler optimization flags enabled (e.g., `200 runs`)
* Lean storage layout to minimize gas usage
* Reduced external calls and efficient contract logic
* Balanced deployment cost vs runtime efficiency

---

## 🗺️ Roadmap

* Introduce **staking** functionality
* Add **governance** features (DAO integration)
* Token **vesting** contracts for team & community
* Cross-chain deployments (beyond Ethereum)
* Enhanced NFT features: royalties, collections, rare drops
* DAO governance for ecosystem management

---

## 🧑‍💻 Support

If you encounter any issues or have questions:

* Create an **Issue** on GitHub
* Refer to [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
* Review [TESTING_GUIDE.md](./TESTING_GUIDE.md)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

This codebase is provided *as-is* for **testnet** use. Always perform a comprehensive security audit before deploying to **mainnet**. Never expose or use real funds, live mainnet private keys, or unverified contracts in production environments.

---

*Built with ❤️ by Neo-Culture Tech*

Innovating through decentralized systems.
