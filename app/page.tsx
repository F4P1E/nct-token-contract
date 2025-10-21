import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { TokenStats } from "@/components/token-stats"
import { WalletSection } from "@/components/wallet-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TokenStats />
      <Features />
      <WalletSection />
    </main>
  )
}
