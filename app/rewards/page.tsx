import { RewardsInterface } from "@/components/rewards/rewards-interface"

export default function RewardsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">NeoRewards</h1>
          <p className="text-muted-foreground">Earn NCT tokens by participating in the Neo-Culture community</p>
        </div>
        <RewardsInterface />
      </div>
    </main>
  )
}
