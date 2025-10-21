"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { TransactionStatus } from "@/components/web3/transaction-status"

interface SwapPreviewProps {
  tokenIn: string
  tokenOut: string
  amountIn: string
  slippage: number
  onClose: () => void
}

export function SwapPreview({ tokenIn, tokenOut, amountIn, slippage, onClose }: SwapPreviewProps) {
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [hash, setHash] = useState<string>()

  const handleConfirmSwap = async () => {
    setIsPending(true)
    try {
      // Simulate swap transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setHash("0x" + Math.random().toString(16).slice(2))
      setIsSuccess(true)
      setTimeout(() => onClose(), 3000)
    } catch (error) {
      console.error("Swap failed:", error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Swap</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">You send</span>
              <span className="font-medium">
                {amountIn} {tokenIn}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">You receive</span>
              <span className="font-medium">
                ~{(Number.parseFloat(amountIn) * 0.9975).toFixed(4)} {tokenOut}
              </span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="text-muted-foreground">Slippage</span>
              <span className="font-medium">{slippage}%</span>
            </div>
          </Card>

          <TransactionStatus hash={hash} isPending={isPending} isConfirming={false} isSuccess={isSuccess} />

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={isPending} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleConfirmSwap} disabled={isPending} className="flex-1">
              {isPending ? "Confirming..." : "Confirm Swap"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
