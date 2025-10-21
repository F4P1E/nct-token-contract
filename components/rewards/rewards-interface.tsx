"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RewardsList } from "./rewards-list"
import { ActivityTracker } from "./activity-tracker"
import { useState } from "react"

export function RewardsInterface() {
  const isConnected = false
  const [activeTab, setActiveTab] = useState<"rewards" | "activities">("rewards")

  if (!isConnected) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground mb-4">Connect your wallet to view your rewards</p>
        <p className="text-sm text-muted-foreground mt-2">Web3 functionality will be available in production</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border">
        <Button
          variant={activeTab === "rewards" ? "default" : "ghost"}
          onClick={() => setActiveTab("rewards")}
          className={activeTab === "rewards" ? "" : "bg-transparent"}
        >
          My Rewards
        </Button>
        <Button
          variant={activeTab === "activities" ? "default" : "ghost"}
          onClick={() => setActiveTab("activities")}
          className={activeTab === "activities" ? "" : "bg-transparent"}
        >
          Activities
        </Button>
      </div>

      {/* Content */}
      {activeTab === "rewards" && <RewardsList />}
      {activeTab === "activities" && <ActivityTracker />}
    </div>
  )
}
