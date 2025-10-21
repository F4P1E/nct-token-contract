"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface NFT {
  id: number
  title: string
  image: string
  price: string
  seller: string
  collection: string
}

interface NFTCardProps {
  nft: NFT
  onBuy: () => void
}

export function NFTCard({ nft, onBuy }: NFTCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square bg-muted flex items-center justify-center overflow-hidden">
        <img src={nft.image || "/placeholder.svg"} alt={nft.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground">{nft.collection}</p>
          <h3 className="font-semibold text-foreground truncate">{nft.title}</h3>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="font-bold text-accent">{nft.price} NCT</p>
          </div>
          <Button onClick={onBuy} size="sm">
            Buy
          </Button>
        </div>
      </div>
    </Card>
  )
}
