"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAccount } from "wagmi"
import { useState } from "react"
import { Gift, TrendingUp } from "lucide-react"

export function RewardsList() {
  const { address } = useAccount()
  const [claimableRewards] = useState("250.50")
  const [claimedRewards] = useState("1,250.00")
  const [isClaiming, setIsClaiming] = useState(false)

  const handleClaim = async () => {
    setIsClaiming(true)
    try {
      // Simulate claim transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert("Rewards claimed successfully!")
    } catch (error) {
      console.error("Claim failed:", error)
    } finally {
      setIsClaiming(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Claimable Rewards */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Claimable</h3>
          <Gift className="h-5 w-5 text-accent" />
        </div>
        <div>
          <p className="text-3xl font-bold text-accent">{claimableRewards}</p>
          <p className="text-sm text-muted-foreground">NCT tokens</p>
        </div>
        <Button onClick={handleClaim} disabled={isClaiming} className="w-full">
          {isClaiming ? "Claiming..." : "Claim Rewards"}
        </Button>
      </Card>

      {/* Claimed Rewards */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Claimed</h3>
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-3xl font-bold text-primary">{claimedRewards}</p>
          <p className="text-sm text-muted-foreground">NCT tokens</p>
        </div>
        <div className="text-sm text-muted-foreground">All-time total</div>
      </Card>

      {/* Total Rewards */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Total</h3>
          <Gift className="h-5 w-5 text-chart-2" />
        </div>
        <div>
          <p className="text-3xl font-bold text-chart-2">
            {(Number.parseFloat(claimableRewards) + Number.parseFloat(claimedRewards.replace(/,/g, ""))).toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">NCT tokens</p>
        </div>
        <div className="text-sm text-muted-foreground">Claimable + Claimed</div>
      </Card>
    </div>
  )
}
