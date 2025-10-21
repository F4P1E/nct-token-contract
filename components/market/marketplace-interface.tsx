"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NFTCard } from "./nft-card"
import { ShoppingCart } from "lucide-react"

// Mock NFT listings
const MOCK_LISTINGS = [
  {
    id: 1,
    title: "Neo Genesis #001",
    image: "/nft-art-1.jpg",
    price: "50",
    seller: "0x1234...5678",
    collection: "Neo Genesis",
  },
  {
    id: 2,
    title: "Culture Pulse #042",
    image: "/nft-art-2.jpg",
    price: "75",
    seller: "0x8765...4321",
    collection: "Culture Pulse",
  },
  {
    id: 3,
    title: "Digital Dreams #007",
    image: "/nft-art-3.jpg",
    price: "100",
    seller: "0xabcd...efgh",
    collection: "Digital Dreams",
  },
  {
    id: 4,
    title: "Cyber Visions #015",
    image: "/nft-art-4.jpg",
    price: "120",
    seller: "0xijkl...mnop",
    collection: "Cyber Visions",
  },
]

export function MarketplaceInterface() {
  const isConnected = false
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNFT, setSelectedNFT] = useState<(typeof MOCK_LISTINGS)[0] | null>(null)

  const filteredListings = MOCK_LISTINGS.filter(
    (nft) =>
      nft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.collection.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex gap-2">
        <Input
          placeholder="Search NFTs or collections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" className="bg-transparent">
          Filter
        </Button>
      </div>

      {!isConnected && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">Connect your wallet to buy NFTs</p>
        </Card>
      )}

      {/* NFT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredListings.map((nft) => (
          <NFTCard key={nft.id} nft={nft} onBuy={() => setSelectedNFT(nft)} />
        ))}
      </div>

      {filteredListings.length === 0 && (
        <Card className="p-12 text-center">
          <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No NFTs found matching your search</p>
        </Card>
      )}

      {/* Buy Modal */}
      {selectedNFT && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">{selectedNFT.title}</h2>
            <img
              src={selectedNFT.image || "/placeholder.svg"}
              alt={selectedNFT.title}
              className="w-full rounded-lg mb-4"
            />
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price</span>
                <span className="font-bold">{selectedNFT.price} NCT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Seller</span>
                <span className="text-sm">{selectedNFT.seller}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedNFT(null)} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button onClick={() => setSelectedNFT(null)} className="flex-1">
                Buy Now
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
