"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ConnectWalletButton } from "@/components/web3/connect-wallet-button"
import { WalletOverview } from "./wallet-overview"
import { NFTGallery } from "./nft-gallery"
import { TransactionHistory } from "./transaction-history"
import { useState } from "react"

export function ProfileDashboard() {
  const address = undefined
  const isConnected = false
  const [activeTab, setActiveTab] = useState<"overview" | "nfts" | "history">("overview")

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-12 text-center space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Your Profile</h1>
            <p className="text-muted-foreground">Connect your wallet to view your portfolio and manage your assets</p>
            <p className="text-sm text-muted-foreground mt-2">Web3 functionality will be available in production</p>
          </div>
          <ConnectWalletButton />
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
          <p className="text-muted-foreground mt-1">{address}</p>
        </div>
        <ConnectWalletButton />
      </div>

      {/* Wallet Overview */}
      <WalletOverview />

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border">
        <Button
          variant={activeTab === "overview" ? "default" : "ghost"}
          onClick={() => setActiveTab("overview")}
          className={activeTab === "overview" ? "" : "bg-transparent"}
        >
          Overview
        </Button>
        <Button
          variant={activeTab === "nfts" ? "default" : "ghost"}
          onClick={() => setActiveTab("nfts")}
          className={activeTab === "nfts" ? "" : "bg-transparent"}
        >
          NFTs
        </Button>
        <Button
          variant={activeTab === "history" ? "default" : "ghost"}
          onClick={() => setActiveTab("history")}
          className={activeTab === "history" ? "" : "bg-transparent"}
        >
          History
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && <WalletOverview />}
      {activeTab === "nfts" && <NFTGallery />}
      {activeTab === "history" && <TransactionHistory />}
    </div>
  )
}
