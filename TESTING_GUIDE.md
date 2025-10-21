# NCT Ecosystem Testing Guide

Comprehensive testing guide for the Neo-Culture Token ecosystem.

## Unit Tests

Run all unit tests:

\`\`\`bash
npm run test
\`\`\`

Run specific test file:

\`\`\`bash
npx hardhat test test/NeoCultureToken.test.js
\`\`\`

Run with gas reporting:

\`\`\`bash
REPORT_GAS=true npm run test
\`\`\`

## Test Coverage

Generate coverage report:

\`\`\`bash
npm run test:coverage
\`\`\`

This generates a coverage report showing which lines of code are tested.

## Integration Testing

### 1. Local Network Testing

Start a local Hardhat node:

\`\`\`bash
npm run node
\`\`\`

In another terminal, deploy to local network:

\`\`\`bash
npx hardhat run scripts/deploy-ecosystem.js --network localhost
\`\`\`

### 2. Testnet Testing

Deploy to Sepolia:

\`\`\`bash
npx hardhat run scripts/deploy-ecosystem.js --network sepolia
\`\`\`

### 3. Frontend Testing

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

Test each module:

#### Swap Module
1. Navigate to `/swap`
2. Connect wallet
3. Select token pair
4. Enter amount
5. Review swap details
6. Confirm transaction
7. Verify transaction on Etherscan

#### Market Module
1. Navigate to `/market`
2. Browse NFT listings
3. Click "Buy" on an NFT
4. Confirm purchase
5. Navigate to `/mint`
6. Upload image
7. Fill in NFT details
8. Mint NFT
9. Verify NFT in profile

#### Rewards Module
1. Navigate to `/rewards`
2. View claimable rewards
3. Click "Claim Rewards"
4. Verify transaction
5. Check updated balance

#### Profile Module
1. Navigate to `/profile`
2. Verify wallet balance displays
3. Check NFT gallery
4. Review transaction history
5. Verify all data is accurate

## Manual Testing Checklist

### Wallet Connection
- [ ] MetaMask connects successfully
- [ ] Wallet address displays correctly
- [ ] Network switches to Sepolia
- [ ] Disconnect works properly

### Token Operations
- [ ] Mint tokens successfully
- [ ] Burn tokens successfully
- [ ] Transfer tokens work
- [ ] Approve tokens for spending

### Swap Operations
- [ ] Select token pairs
- [ ] Calculate output amounts
- [ ] Apply slippage tolerance
- [ ] Execute swaps
- [ ] Verify fee deduction

### NFT Operations
- [ ] Mint NFTs with metadata
- [ ] List NFTs for sale
- [ ] Buy NFTs with NCT
- [ ] Cancel listings
- [ ] View owned NFTs

### Reward Operations
- [ ] Add rewards to users
- [ ] Track activity rewards
- [ ] Claim rewards
- [ ] Verify balance updates

### Error Handling
- [ ] Insufficient balance error
- [ ] Slippage exceeded error
- [ ] Invalid address error
- [ ] Transaction rejected error
- [ ] Network error handling

## Performance Testing

### Gas Usage

Check gas usage for critical functions:

\`\`\`bash
REPORT_GAS=true npm run test
\`\`\`

Expected gas ranges:
- Mint: 50,000 - 100,000 gas
- Swap: 80,000 - 150,000 gas
- Buy NFT: 100,000 - 200,000 gas
- Claim Rewards: 60,000 - 120,000 gas

### Load Testing

Test with multiple concurrent transactions:

\`\`\`javascript
// Example: Send 10 concurrent swaps
const promises = [];
for (let i = 0; i < 10; i++) {
  promises.push(swapRouter.swap(...));
}
await Promise.all(promises);
\`\`\`

## Security Testing

### Reentrancy Testing

Verify reentrancy guards work:

\`\`\`bash
npx hardhat test test/ReentrancyTest.js
\`\`\`

### Access Control Testing

Verify only authorized users can call functions:

\`\`\`bash
npx hardhat test test/AccessControlTest.js
\`\`\`

### Input Validation Testing

Test with invalid inputs:

\`\`\`bash
npx hardhat test test/InputValidationTest.js
\`\`\`

## Continuous Integration

GitHub Actions workflow for automated testing:

\`\`\`yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run test
      - run: npm run test:coverage
\`\`\`

## Debugging

### Enable Debug Logging

\`\`\`bash
DEBUG=* npx hardhat test
\`\`\`

### Use Hardhat Console

\`\`\`bash
npx hardhat console --network sepolia
\`\`\`

Then in console:

\`\`\`javascript
const contract = await ethers.getContractAt("SwapRouter", "0x...");
await contract.getAmountOut(...);
\`\`\`

## Test Results

Expected test results:

\`\`\`
NeoCultureToken
  ✓ Should mint tokens
  ✓ Should burn tokens
  ✓ Should pause/unpause
  ✓ Should transfer tokens

SwapRouter
  ✓ Should swap tokens
  ✓ Should charge fees
  ✓ Should enforce slippage

ClubNFT
  ✓ Should mint NFTs
  ✓ Should batch mint

Marketplace
  ✓ Should list NFTs
  ✓ Should buy NFTs
  ✓ Should charge fees

RewardManager
  ✓ Should add rewards
  ✓ Should claim rewards
  ✓ Should track activity

Total: 50+ tests passing
\`\`\`

## Reporting Issues

When reporting test failures:

1. Include full error message
2. Provide test file and line number
3. Share contract addresses
4. Include transaction hash
5. Describe steps to reproduce
