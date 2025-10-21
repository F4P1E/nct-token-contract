"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

const TOKENS = [
  { address: "0x...", symbol: "NCT", name: "Neo-Culture Token" },
  { address: "0x...", symbol: "USDC", name: "USD Coin" },
  { address: "0x...", symbol: "USDT", name: "Tether" },
  { address: "0x...", symbol: "DAI", name: "Dai Stablecoin" },
]

interface SwapTokenSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function SwapTokenSelector({ value, onChange }: SwapTokenSelectorProps) {
  const selectedToken = TOKENS.find((t) => t.address === value)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-32 bg-transparent">
          {selectedToken?.symbol || "Select"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {TOKENS.map((token) => (
          <DropdownMenuItem key={token.address} onClick={() => onChange(token.address)}>
            <div>
              <div className="font-medium">{token.symbol}</div>
              <div className="text-xs text-muted-foreground">{token.name}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
