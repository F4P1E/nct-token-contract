import { SwapInterface } from "@/components/swap/swap-interface"

export default function SwapPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">NeoSwap</h1>
            <p className="text-muted-foreground">Exchange NCT and other tokens instantly</p>
          </div>
          <SwapInterface />
        </div>
      </div>
    </main>
  )
}
