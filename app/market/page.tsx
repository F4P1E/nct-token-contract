import { MarketplaceInterface } from "@/components/market/marketplace-interface"

export default function MarketPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">NeoMarket</h1>
          <p className="text-muted-foreground">Discover and trade unique NFTs from the Neo-Culture community</p>
        </div>
        <MarketplaceInterface />
      </div>
    </main>
  )
}
