const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Marketplace", () => {
  let marketplace
  let clubNFT
  let nctToken
  let owner
  let seller
  let buyer
  let feeRecipient

  beforeEach(async () => {
    ;[owner, seller, buyer, feeRecipient] = await ethers.getSigners()

    // Deploy NCT token
    const ERC20Mock = await ethers.getContractFactory("ERC20Mock")
    nctToken = await ERC20Mock.deploy("NCT", "NCT", ethers.parseEther("1000000"))

    // Deploy ClubNFT
    const ClubNFT = await ethers.getContractFactory("ClubNFT")
    clubNFT = await ClubNFT.deploy("ipfs://", feeRecipient.address)

    // Deploy Marketplace
    const Marketplace = await ethers.getContractFactory("Marketplace")
    marketplace = await Marketplace.deploy(nctToken.target, feeRecipient.address)

    // Mint NFT to seller
    await clubNFT.connect(seller).mint(seller.address, "ipfs://QmTest", { value: 0 })

    // Transfer NCT to buyer
    await nctToken.transfer(buyer.address, ethers.parseEther("1000"))
    await nctToken.connect(buyer).approve(marketplace.target, ethers.parseEther("1000"))
  })

  describe("Listing", () => {
    it("Should list an NFT", async () => {
      const price = ethers.parseEther("100")
      await clubNFT.connect(seller).approve(marketplace.target, 0)

      await expect(marketplace.connect(seller).listNFT(clubNFT.target, 0, price))
        .to.emit(marketplace, "NFTListed")
        .withArgs(clubNFT.target, 0, seller.address, price)
    })

    it("Should cancel a listing", async () => {
      const price = ethers.parseEther("100")
      await clubNFT.connect(seller).approve(marketplace.target, 0)
      await marketplace.connect(seller).listNFT(clubNFT.target, 0, price)

      await expect(marketplace.connect(seller).cancelListing(clubNFT.target, 0))
        .to.emit(marketplace, "NFTUnlisted")
        .withArgs(clubNFT.target, 0, seller.address)
    })
  })

  describe("Buying", () => {
    beforeEach(async () => {
      const price = ethers.parseEther("100")
      await clubNFT.connect(seller).approve(marketplace.target, 0)
      await marketplace.connect(seller).listNFT(clubNFT.target, 0, price)
    })

    it("Should buy an NFT", async () => {
      const price = ethers.parseEther("100")

      await expect(marketplace.connect(buyer).buyNFT(clubNFT.target, 0))
        .to.emit(marketplace, "NFTSold")
        .withArgs(clubNFT.target, 0, seller.address, buyer.address, price)

      expect(await clubNFT.ownerOf(0)).to.equal(buyer.address)
    })

    it("Should charge platform fee", async () => {
      const price = ethers.parseEther("100")
      const expectedFee = (price * 250n) / 10000n

      await marketplace.connect(buyer).buyNFT(clubNFT.target, 0)

      const feeBalance = await nctToken.balanceOf(feeRecipient.address)
      expect(feeBalance).to.equal(expectedFee)
    })
  })
})
