"use client"

import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

export function ConnectWalletButton() {
  const handleConnect = () => {
    // This will work when deployed to production with proper Web3 setup
    alert("Web3 wallet connection will be available after deployment. For now, the UI is ready to preview!")
  }

  return (
    <Button
      onClick={handleConnect}
      size="lg"
      className="gap-2 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 shadow-lg shadow-accent/25"
    >
      <Wallet className="h-5 w-5" />
      Connect Wallet
    </Button>
  )
}
