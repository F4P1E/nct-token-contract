const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("NeoCultureToken", () => {
  let nct
  let owner
  let addr1
  let addr2
  const INITIAL_SUPPLY = ethers.parseEther("10000000") // 10 million
  const MAX_SUPPLY = ethers.parseEther("100000000") // 100 million

  beforeEach(async () => {
    ;[owner, addr1, addr2] = await ethers.getSigners()
    const NeoCultureToken = await ethers.getContractFactory("NeoCultureToken")
    nct = await NeoCultureToken.deploy(INITIAL_SUPPLY)
    await nct.waitForDeployment()
  })

  describe("Deployment", () => {
    it("Should set the correct name and symbol", async () => {
      expect(await nct.name()).to.equal("Neo-Culture Token")
      expect(await nct.symbol()).to.equal("NCT")
    })

    it("Should set the correct decimals", async () => {
      expect(await nct.decimals()).to.equal(18)
    })

    it("Should mint initial supply to owner", async () => {
      const ownerBalance = await nct.balanceOf(owner.address)
      expect(ownerBalance).to.equal(INITIAL_SUPPLY)
    })

    it("Should set the correct max supply", async () => {
      expect(await nct.MAX_SUPPLY()).to.equal(MAX_SUPPLY)
    })

    it("Should set the deployer as owner", async () => {
      expect(await nct.owner()).to.equal(owner.address)
    })
  })

  describe("Minting", () => {
    it("Should allow owner to mint tokens", async () => {
      const mintAmount = ethers.parseEther("1000")
      await expect(nct.mint(addr1.address, mintAmount)).to.emit(nct, "TokensMinted").withArgs(addr1.address, mintAmount)

      expect(await nct.balanceOf(addr1.address)).to.equal(mintAmount)
    })

    it("Should not allow non-owner to mint tokens", async () => {
      const mintAmount = ethers.parseEther("1000")
      await expect(nct.connect(addr1).mint(addr2.address, mintAmount)).to.be.revertedWithCustomError(
        nct,
        "OwnableUnauthorizedAccount",
      )
    })

    it("Should not allow minting to zero address", async () => {
      const mintAmount = ethers.parseEther("1000")
      await expect(nct.mint(ethers.ZeroAddress, mintAmount)).to.be.revertedWith("Cannot mint to zero address")
    })

    it("Should not allow minting zero amount", async () => {
      await expect(nct.mint(addr1.address, 0)).to.be.revertedWith("Amount must be greater than zero")
    })

    it("Should not allow minting beyond max supply", async () => {
      const excessAmount = MAX_SUPPLY - INITIAL_SUPPLY + ethers.parseEther("1")
      await expect(nct.mint(addr1.address, excessAmount)).to.be.revertedWith("Minting would exceed max supply")
    })

    it("Should allow minting up to max supply", async () => {
      const remainingSupply = MAX_SUPPLY - INITIAL_SUPPLY
      await nct.mint(addr1.address, remainingSupply)
      expect(await nct.totalSupply()).to.equal(MAX_SUPPLY)
    })
  })

  describe("Burning", () => {
    it("Should allow token holders to burn their tokens", async () => {
      const burnAmount = ethers.parseEther("1000")
      await nct.burn(burnAmount)

      expect(await nct.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY - burnAmount)
      expect(await nct.totalSupply()).to.equal(INITIAL_SUPPLY - burnAmount)
    })

    it("Should not allow burning more than balance", async () => {
      const excessAmount = INITIAL_SUPPLY + ethers.parseEther("1")
      await expect(nct.burn(excessAmount)).to.be.revertedWithCustomError(nct, "ERC20InsufficientBalance")
    })

    it("Should allow burning tokens from another account with approval", async () => {
      const transferAmount = ethers.parseEther("1000")
      const burnAmount = ethers.parseEther("500")

      await nct.transfer(addr1.address, transferAmount)
      await nct.connect(addr1).approve(owner.address, burnAmount)
      await nct.burnFrom(addr1.address, burnAmount)

      expect(await nct.balanceOf(addr1.address)).to.equal(transferAmount - burnAmount)
    })
  })

  describe("Pausing", () => {
    it("Should allow owner to pause the contract", async () => {
      await expect(nct.pause()).to.emit(nct, "ContractPaused").withArgs(owner.address)

      expect(await nct.paused()).to.equal(true)
    })

    it("Should allow owner to unpause the contract", async () => {
      await nct.pause()
      await expect(nct.unpause()).to.emit(nct, "ContractUnpaused").withArgs(owner.address)

      expect(await nct.paused()).to.equal(false)
    })

    it("Should not allow non-owner to pause", async () => {
      await expect(nct.connect(addr1).pause()).to.be.revertedWithCustomError(nct, "OwnableUnauthorizedAccount")
    })

    it("Should not allow non-owner to unpause", async () => {
      await nct.pause()
      await expect(nct.connect(addr1).unpause()).to.be.revertedWithCustomError(nct, "OwnableUnauthorizedAccount")
    })

    it("Should prevent transfers when paused", async () => {
      await nct.pause()
      await expect(nct.transfer(addr1.address, ethers.parseEther("100"))).to.be.revertedWithCustomError(
        nct,
        "EnforcedPause",
      )
    })

    it("Should allow transfers when unpaused", async () => {
      await nct.pause()
      await nct.unpause()
      await expect(nct.transfer(addr1.address, ethers.parseEther("100"))).to.not.be.reverted
    })

    it("Should prevent minting when paused", async () => {
      await nct.pause()
      await expect(nct.mint(addr1.address, ethers.parseEther("100"))).to.be.revertedWithCustomError(
        nct,
        "EnforcedPause",
      )
    })
  })

  describe("Transfers", () => {
    it("Should transfer tokens between accounts", async () => {
      const transferAmount = ethers.parseEther("1000")
      await nct.transfer(addr1.address, transferAmount)

      expect(await nct.balanceOf(addr1.address)).to.equal(transferAmount)
      expect(await nct.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY - transferAmount)
    })

    it("Should fail if sender doesn't have enough tokens", async () => {
      const initialOwnerBalance = await nct.balanceOf(owner.address)
      await expect(nct.connect(addr1).transfer(owner.address, ethers.parseEther("1"))).to.be.revertedWithCustomError(
        nct,
        "ERC20InsufficientBalance",
      )

      expect(await nct.balanceOf(owner.address)).to.equal(initialOwnerBalance)
    })

    it("Should update balances after transfers", async () => {
      const initialOwnerBalance = await nct.balanceOf(owner.address)
      const amount1 = ethers.parseEther("100")
      const amount2 = ethers.parseEther("50")

      await nct.transfer(addr1.address, amount1)
      await nct.transfer(addr2.address, amount2)

      const finalOwnerBalance = await nct.balanceOf(owner.address)
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - amount1 - amount2)

      expect(await nct.balanceOf(addr1.address)).to.equal(amount1)
      expect(await nct.balanceOf(addr2.address)).to.equal(amount2)
    })
  })

  describe("Ownership", () => {
    it("Should transfer ownership", async () => {
      await nct.transferOwnership(addr1.address)
      expect(await nct.owner()).to.equal(addr1.address)
    })

    it("Should prevent non-owners from transferring ownership", async () => {
      await expect(nct.connect(addr1).transferOwnership(addr2.address)).to.be.revertedWithCustomError(
        nct,
        "OwnableUnauthorizedAccount",
      )
    })

    it("Should allow new owner to mint after ownership transfer", async () => {
      await nct.transferOwnership(addr1.address)
      await expect(nct.connect(addr1).mint(addr2.address, ethers.parseEther("1000"))).to.not.be.reverted
    })
  })
})
