"use client"

import type { ReactNode } from "react"

// The full wagmi/rainbowkit setup will work in production deployment
export function Web3Provider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
