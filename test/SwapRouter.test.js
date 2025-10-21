const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("SwapRouter", () => {
  let swapRouter
  let tokenA
  let tokenB
  let owner
  let user1
  let feeRecipient

  beforeEach(async () => {
    ;[owner, user1, feeRecipient] = await ethers.getSigners()

    // Deploy mock ERC20 tokens
    const ERC20Mock = await ethers.getContractFactory("ERC20Mock")
    tokenA = await ERC20Mock.deploy("Token A", "TKNA", ethers.parseEther("1000000"))
    tokenB = await ERC20Mock.deploy("Token B", "TKNB", ethers.parseEther("1000000"))

    // Deploy SwapRouter
    const SwapRouter = await ethers.getContractFactory("SwapRouter")
    swapRouter = await SwapRouter.deploy(feeRecipient.address)

    // Add pair
    await swapRouter.addPair(tokenA.target, tokenB.target)

    // Approve tokens
    await tokenA.approve(swapRouter.target, ethers.parseEther("1000000"))
    await tokenB.approve(swapRouter.target, ethers.parseEther("1000000"))

    // Transfer tokens to user1
    await tokenA.transfer(user1.address, ethers.parseEther("1000"))
    await tokenB.transfer(user1.address, ethers.parseEther("1000"))
  })

  describe("Deployment", () => {
    it("Should set the correct fee recipient", async () => {
      expect(await swapRouter.feeRecipient()).to.equal(feeRecipient.address)
    })

    it("Should have default swap fee of 25 basis points", async () => {
      expect(await swapRouter.swapFee()).to.equal(25)
    })
  })

  describe("Pair Management", () => {
    it("Should add a supported pair", async () => {
      const isSupported = await swapRouter.supportedPairs(tokenA.target, tokenB.target)
      expect(isSupported).to.be.true
    })

    it("Should remove a supported pair", async () => {
      await swapRouter.removePair(tokenA.target, tokenB.target)
      const isSupported = await swapRouter.supportedPairs(tokenA.target, tokenB.target)
      expect(isSupported).to.be.false
    })

    it("Should not allow non-owner to add pair", async () => {
      const newToken = await (await ethers.getContractFactory("ERC20Mock")).deploy(
        "New",
        "NEW",
        ethers.parseEther("1000"),
      )
      await expect(swapRouter.connect(user1).addPair(tokenA.target, newToken.target)).to.be.revertedWithCustomError(
        swapRouter,
        "OwnableUnauthorizedAccount",
      )
    })
  })

  describe("Swapping", () => {
    beforeEach(async () => {
      await tokenA.connect(user1).approve(swapRouter.target, ethers.parseEther("1000"))
      await tokenB.connect(user1).approve(swapRouter.target, ethers.parseEther("1000"))
    })

    it("Should swap tokens successfully", async () => {
      const amountIn = ethers.parseEther("100")
      const expectedFee = (amountIn * 25n) / 10000n
      const expectedAmountOut = amountIn - expectedFee

      const tx = await swapRouter.connect(user1).swap(tokenA.target, tokenB.target, amountIn, 0)

      const balanceB = await tokenB.balanceOf(user1.address)
      expect(balanceB).to.equal(ethers.parseEther("1000") + expectedAmountOut)
    })

    it("Should charge swap fee", async () => {
      const amountIn = ethers.parseEther("100")
      const expectedFee = (amountIn * 25n) / 10000n

      await swapRouter.connect(user1).swap(tokenA.target, tokenB.target, amountIn, 0)

      const feeBalance = await tokenA.balanceOf(feeRecipient.address)
      expect(feeBalance).to.equal(expectedFee)
    })

    it("Should revert if slippage exceeded", async () => {
      const amountIn = ethers.parseEther("100")
      const minAmountOut = ethers.parseEther("100") // Impossible minimum

      await expect(
        swapRouter.connect(user1).swap(tokenA.target, tokenB.target, amountIn, minAmountOut),
      ).to.be.revertedWith("Slippage exceeded")
    })

    it("Should revert for unsupported pair", async () => {
      const newToken = await (await ethers.getContractFactory("ERC20Mock")).deploy(
        "New",
        "NEW",
        ethers.parseEther("1000"),
      )

      await expect(
        swapRouter.connect(user1).swap(tokenA.target, newToken.target, ethers.parseEther("100"), 0),
      ).to.be.revertedWith("Pair not supported")
    })
  })

  describe("Fee Management", () => {
    it("Should update swap fee", async () => {
      await swapRouter.setSwapFee(50)
      expect(await swapRouter.swapFee()).to.equal(50)
    })

    it("Should not allow fee higher than 10%", async () => {
      await expect(swapRouter.setSwapFee(1001)).to.be.revertedWith("Fee too high")
    })

    it("Should update fee recipient", async () => {
      const newRecipient = user1.address
      await swapRouter.setFeeRecipient(newRecipient)
      expect(await swapRouter.feeRecipient()).to.equal(newRecipient)
    })
  })

  describe("View Functions", () => {
    it("Should return correct amount out", async () => {
      const amountIn = ethers.parseEther("100")
      const expectedFee = (amountIn * 25n) / 10000n
      const expectedAmountOut = amountIn - expectedFee

      const amountOut = await swapRouter.getAmountOut(tokenA.target, tokenB.target, amountIn)
      expect(amountOut).to.equal(expectedAmountOut)
    })

    it("Should return supported tokens", async () => {
      const tokens = await swapRouter.getSupportedTokens()
      expect(tokens.length).to.be.greaterThan(0)
    })
  })
})
