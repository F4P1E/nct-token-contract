import { NFTMintForm } from "@/components/market/nft-mint-form"

export default function MintPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Mint NFT</h1>
            <p className="text-muted-foreground">Create your own unique NFT and join the Neo-Culture community</p>
          </div>
          <NFTMintForm />
        </div>
      </div>
    </main>
  )
}
