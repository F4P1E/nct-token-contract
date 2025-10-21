"use client"

import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TransactionStatusProps {
  hash?: string
  isPending: boolean
  isConfirming: boolean
  isSuccess: boolean
  error?: Error | null
}

export function TransactionStatus({ hash, isPending, isConfirming, isSuccess, error }: TransactionStatusProps) {
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    if (isPending || isConfirming || isSuccess || error) {
      setShowStatus(true)
    }
  }, [isPending, isConfirming, isSuccess, error])

  if (!showStatus) return null

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Transaction failed: {error.message}</AlertDescription>
      </Alert>
    )
  }

  if (isPending) {
    return (
      <Alert>
        <Clock className="h-4 w-4 animate-spin" />
        <AlertDescription>Waiting for wallet confirmation...</AlertDescription>
      </Alert>
    )
  }

  if (isConfirming) {
    return (
      <Alert>
        <Clock className="h-4 w-4 animate-spin" />
        <AlertDescription>Transaction pending... {hash && `(${hash.slice(0, 10)}...)`}</AlertDescription>
      </Alert>
    )
  }

  if (isSuccess) {
    return (
      <Alert className="border-green-500 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Transaction confirmed! {hash && `(${hash.slice(0, 10)}...)`}
        </AlertDescription>
      </Alert>
    )
  }

  return null
}
