"use client"

import { Card } from "@/components/ui/card"
import { useAccount } from "wagmi"
import { Wallet, TrendingUp, Zap } from "lucide-react"

export function WalletOverview() {
  const { address } = useAccount()

  // Mock data - in production, fetch from contract
  const balances = {
    nct: "5,250.50",
    eth: "0.85",
    usd: "$12,450.00",
  }

  const stats = [
    {
      label: "NCT Balance",
      value: balances.nct,
      icon: Wallet,
      color: "text-accent",
    },
    {
      label: "ETH Balance",
      value: balances.eth,
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      label: "Portfolio Value",
      value: balances.usd,
      icon: Zap,
      color: "text-chart-2",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{stat.label}</h3>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            <div className="text-xs text-muted-foreground">
              {stat.label === "NCT Balance" && "On Sepolia Testnet"}
              {stat.label === "ETH Balance" && "Testnet ETH"}
              {stat.label === "Portfolio Value" && "Estimated value"}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
