const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("RewardManager", () => {
  let rewardManager
  let nctToken
  let owner
  let user1
  let user2

  beforeEach(async () => {
    ;[owner, user1, user2] = await ethers.getSigners()

    // Deploy NCT token
    const ERC20Mock = await ethers.getContractFactory("ERC20Mock")
    nctToken = await ERC20Mock.deploy("NCT", "NCT", ethers.parseEther("1000000"))

    // Deploy RewardManager
    const RewardManager = await ethers.getContractFactory("RewardManager")
    rewardManager = await RewardManager.deploy(nctToken.target)

    // Transfer tokens to RewardManager
    await nctToken.transfer(rewardManager.target, ethers.parseEther("100000"))
  })

  describe("Deployment", () => {
    it("Should set correct NCT token address", async () => {
      expect(await rewardManager.nctToken()).to.equal(nctToken.target)
    })

    it("Should have default activity rewards", async () => {
      const mintReward = await rewardManager.getActivityReward("MINT_NFT")
      expect(mintReward).to.equal(ethers.parseEther("10"))
    })
  })

  describe("Adding Rewards", () => {
    it("Should add reward to user", async () => {
      const amount = ethers.parseEther("50")
      await rewardManager.addReward(user1.address, amount, "Test reward")

      const claimable = await rewardManager.getClaimableRewards(user1.address)
      expect(claimable).to.equal(amount)
    })

    it("Should add activity-based reward", async () => {
      await rewardManager.addActivityReward(user1.address, "MINT_NFT")

      const claimable = await rewardManager.getClaimableRewards(user1.address)
      expect(claimable).to.equal(ethers.parseEther("10"))
    })

    it("Should batch add rewards", async () => {
      const users = [user1.address, user2.address]
      const amounts = [ethers.parseEther("50"), ethers.parseEther("75")]

      await rewardManager.batchAddRewards(users, amounts, "Batch rewards")

      const claimable1 = await rewardManager.getClaimableRewards(user1.address)
      const claimable2 = await rewardManager.getClaimableRewards(user2.address)

      expect(claimable1).to.equal(amounts[0])
      expect(claimable2).to.equal(amounts[1])
    })

    it("Should not allow non-owner to add rewards", async () => {
      await expect(
        rewardManager.connect(user1).addReward(user2.address, ethers.parseEther("50"), "Test"),
      ).to.be.revertedWithCustomError(rewardManager, "OwnableUnauthorizedAccount")
    })
  })

  describe("Claiming Rewards", () => {
    beforeEach(async () => {
      await rewardManager.addReward(user1.address, ethers.parseEther("100"), "Test reward")
    })

    it("Should claim available rewards", async () => {
      const initialBalance = await nctToken.balanceOf(user1.address)

      await rewardManager.connect(user1).claimRewards()

      const finalBalance = await nctToken.balanceOf(user1.address)
      expect(finalBalance).to.equal(initialBalance + ethers.parseEther("100"))
    })

    it("Should update claimed rewards", async () => {
      await rewardManager.connect(user1).claimRewards()

      const claimed = await rewardManager.getClaimedRewards(user1.address)
      expect(claimed).to.equal(ethers.parseEther("100"))
    })

    it("Should clear claimable rewards after claim", async () => {
      await rewardManager.connect(user1).claimRewards()

      const claimable = await rewardManager.getClaimableRewards(user1.address)
      expect(claimable).to.equal(0)
    })

    it("Should revert if no rewards to claim", async () => {
      await expect(rewardManager.connect(user2).claimRewards()).to.be.revertedWith("No rewards to claim")
    })
  })

  describe("View Functions", () => {
    beforeEach(async () => {
      await rewardManager.addReward(user1.address, ethers.parseEther("100"), "Test")
      await rewardManager.connect(user1).claimRewards()
      await rewardManager.addReward(user1.address, ethers.parseEther("50"), "Test 2")
    })

    it("Should return total rewards", async () => {
      const total = await rewardManager.getTotalRewards(user1.address)
      expect(total).to.equal(ethers.parseEther("150"))
    })

    it("Should return claimable rewards", async () => {
      const claimable = await rewardManager.getClaimableRewards(user1.address)
      expect(claimable).to.equal(ethers.parseEther("50"))
    })

    it("Should return claimed rewards", async () => {
      const claimed = await rewardManager.getClaimedRewards(user1.address)
      expect(claimed).to.equal(ethers.parseEther("100"))
    })
  })

  describe("Activity Rewards", () => {
    it("Should set activity reward", async () => {
      await rewardManager.setActivityReward("CUSTOM_ACTIVITY", ethers.parseEther("25"))

      const reward = await rewardManager.getActivityReward("CUSTOM_ACTIVITY")
      expect(reward).to.equal(ethers.parseEther("25"))
    })

    it("Should emit ActivityRewardSet event", async () => {
      await expect(rewardManager.setActivityReward("NEW_ACTIVITY", ethers.parseEther("30")))
        .to.emit(rewardManager, "ActivityRewardSet")
        .withArgs("NEW_ACTIVITY", ethers.parseEther("30"))
    })
  })
})
