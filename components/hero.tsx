import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />

      <div className="container relative mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src="/neo-culture-tech-banner.png"
              alt="Neo Culture Tech"
              width={600}
              height={200}
              className="w-full max-w-2xl h-auto"
              priority
            />
          </div>

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            Now Live on Sepolia Testnet
          </div>

          <h1 className="mb-6 text-balance font-sans text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            The Future of{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Digital Culture
            </span>
          </h1>

          <p className="mb-10 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Neo-Culture Token (NCT) powers the next generation of creative communities. Connect your wallet and mint
            demo tokens on Sepolia testnet.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/swap">
              <Button
                size="lg"
                className="w-full gap-2 sm:w-auto shadow-lg shadow-accent/25 bg-accent hover:bg-accent/90"
              >
                <Sparkles className="h-5 w-5" />
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-accent/20 hover:bg-accent/5 bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>

          <div className="mt-12 inline-flex items-center gap-3 rounded-lg border border-border bg-card/50 backdrop-blur-sm px-5 py-3 font-mono text-sm text-muted-foreground shadow-lg">
            <span className="text-accent font-bold">$</span>
            <span>npx hardhat run scripts/deploy.js --network sepolia</span>
          </div>
        </div>
      </div>
    </section>
  )
}
