"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const USER_NFTS = [
  {
    id: 1,
    title: "Neo Genesis #001",
    collection: "Neo Genesis",
    image: "/nft-art-1.jpg",
    floorPrice: "50 NCT",
    listedPrice: null,
  },
  {
    id: 2,
    title: "Culture Pulse #042",
    collection: "Culture Pulse",
    image: "/nft-art-2.jpg",
    floorPrice: "75 NCT",
    listedPrice: "100 NCT",
  },
  {
    id: 3,
    title: "Digital Dreams #007",
    collection: "Digital Dreams",
    image: "/nft-art-3.jpg",
    floorPrice: "100 NCT",
    listedPrice: null,
  },
]

export function NFTGallery() {
  if (USER_NFTS.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">You don't own any NFTs yet. Visit the marketplace to get started!</p>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {USER_NFTS.map((nft) => (
        <Card key={nft.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative aspect-square bg-muted flex items-center justify-center overflow-hidden">
            <img src={nft.image || "/placeholder.svg"} alt={nft.title} className="w-full h-full object-cover" />
            {nft.listedPrice && <Badge className="absolute top-2 right-2 bg-green-500">Listed</Badge>}
          </div>
          <div className="p-4 space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">{nft.collection}</p>
              <h3 className="font-semibold text-foreground truncate">{nft.title}</h3>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Floor Price</span>
                <span className="font-medium">{nft.floorPrice}</span>
              </div>
              {nft.listedPrice && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Listed Price</span>
                  <span className="font-medium text-accent">{nft.listedPrice}</span>
                </div>
              )}
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                View
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                {nft.listedPrice ? "Delist" : "List"}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
