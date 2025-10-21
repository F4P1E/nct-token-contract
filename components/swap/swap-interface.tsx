"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SwapTokenSelector } from "./swap-token-selector"
import { SwapPreview } from "./swap-preview"
import { ArrowDownUp } from "lucide-react"

export function SwapInterface() {
  const isConnected = false
  const [tokenIn, setTokenIn] = useState<string>("")
  const [tokenOut, setTokenOut] = useState<string>("")
  const [amountIn, setAmountIn] = useState<string>("")
  const [showPreview, setShowPreview] = useState(false)
  const [slippage, setSlippage] = useState<number>(0.5)

  const handleSwap = () => {
    if (!tokenIn || !tokenOut || !amountIn) {
      alert("Please fill in all fields")
      return
    }
    setShowPreview(true)
  }

  const handleSwapTokens = () => {
    const temp = tokenIn
    setTokenIn(tokenOut)
    setTokenOut(temp)
  }

  if (!isConnected) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground mb-4">Connect your wallet to start swapping</p>
        <p className="text-sm text-muted-foreground mt-2">Web3 functionality will be available in production</p>
      </Card>
    )
  }

  return (
    <>
      <Card className="p-6 space-y-6">
        {/* Token In */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">From</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.00"
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value)}
              className="flex-1"
            />
            <SwapTokenSelector value={tokenIn} onChange={setTokenIn} />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button variant="outline" size="icon" onClick={handleSwapTokens} className="rounded-full bg-transparent">
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>

        {/* Token Out */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">To</label>
          <div className="flex gap-2">
            <Input type="number" placeholder="0.00" disabled className="flex-1" />
            <SwapTokenSelector value={tokenOut} onChange={setTokenOut} />
          </div>
        </div>

        {/* Slippage Settings */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Slippage Tolerance</label>
          <div className="flex gap-2">
            {[0.1, 0.5, 1].map((value) => (
              <Button
                key={value}
                variant={slippage === value ? "default" : "outline"}
                size="sm"
                onClick={() => setSlippage(value)}
              >
                {value}%
              </Button>
            ))}
            <Input
              type="number"
              placeholder="Custom"
              value={slippage}
              onChange={(e) => setSlippage(Number.parseFloat(e.target.value))}
              className="w-20"
            />
          </div>
        </div>

        {/* Swap Button */}
        <Button onClick={handleSwap} disabled={!tokenIn || !tokenOut || !amountIn} className="w-full" size="lg">
          Review Swap
        </Button>
      </Card>

      {/* Preview Modal */}
      {showPreview && (
        <SwapPreview
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          amountIn={amountIn}
          slippage={slippage}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  )
}
