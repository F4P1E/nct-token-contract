"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, Zap } from "lucide-react"

const TRANSACTIONS = [
  {
    id: 1,
    type: "swap",
    title: "Swapped NCT for USDC",
    amount: "100 NCT",
    status: "confirmed",
    date: "2024-01-15 14:30",
    hash: "0x1234...5678",
  },
  {
    id: 2,
    type: "buy",
    title: "Bought NFT: Culture Pulse #042",
    amount: "100 NCT",
    status: "confirmed",
    date: "2024-01-14 10:15",
    hash: "0x2345...6789",
  },
  {
    id: 3,
    type: "mint",
    title: "Minted NFT: My Creation",
    amount: "0 NCT",
    status: "confirmed",
    date: "2024-01-13 09:45",
    hash: "0x3456...7890",
  },
  {
    id: 4,
    type: "claim",
    title: "Claimed Rewards",
    amount: "+50 NCT",
    status: "confirmed",
    date: "2024-01-12 16:20",
    hash: "0x4567...8901",
  },
  {
    id: 5,
    type: "sell",
    title: "Sold NFT: Neo Genesis #001",
    amount: "+50 NCT",
    status: "pending",
    date: "2024-01-11 11:00",
    hash: "0x5678...9012",
  },
]

export function TransactionHistory() {
  const getIcon = (type: string) => {
    switch (type) {
      case "swap":
        return <Zap className="h-5 w-5" />
      case "buy":
        return <ArrowDownLeft className="h-5 w-5" />
      case "sell":
        return <ArrowUpRight className="h-5 w-5" />
      default:
        return <Zap className="h-5 w-5" />
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case "swap":
        return "text-primary"
      case "buy":
        return "text-red-500"
      case "sell":
        return "text-green-500"
      case "claim":
        return "text-accent"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-3">
      {TRANSACTIONS.map((tx) => (
        <Card key={tx.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className={`${getColor(tx.type)}`}>{getIcon(tx.type)}</div>
            <div>
              <p className="font-medium text-foreground">{tx.title}</p>
              <p className="text-xs text-muted-foreground">{tx.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold text-foreground">{tx.amount}</p>
              <p className="text-xs text-muted-foreground">{tx.hash}</p>
            </div>
            <Badge variant={tx.status === "confirmed" ? "default" : "secondary"}>
              {tx.status === "confirmed" ? "Confirmed" : "Pending"}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  )
}
