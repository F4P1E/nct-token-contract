"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock } from "lucide-react"

const ACTIVITIES = [
  {
    id: 1,
    type: "MINT_NFT",
    title: "Mint NFT",
    reward: "10 NCT",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: 2,
    type: "SELL_NFT",
    title: "Sell NFT",
    reward: "5 NCT",
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: 3,
    type: "SWAP_TOKEN",
    title: "Swap Tokens",
    reward: "2 NCT",
    status: "pending",
    date: "2024-01-13",
  },
  {
    id: 4,
    type: "ATTEND_EVENT",
    title: "Attend Event",
    reward: "15 NCT",
    status: "completed",
    date: "2024-01-12",
  },
  {
    id: 5,
    type: "COMMUNITY_POST",
    title: "Community Post",
    reward: "3 NCT",
    status: "completed",
    date: "2024-01-11",
  },
]

export function ActivityTracker() {
  return (
    <div className="space-y-3">
      {ACTIVITIES.map((activity) => (
        <Card key={activity.id} className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {activity.status === "completed" ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <Clock className="h-5 w-5 text-yellow-500" />
            )}
            <div>
              <p className="font-medium text-foreground">{activity.title}</p>
              <p className="text-sm text-muted-foreground">{activity.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={activity.status === "completed" ? "default" : "secondary"}>
              {activity.status === "completed" ? "Completed" : "Pending"}
            </Badge>
            <p className="font-semibold text-accent">{activity.reward}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
