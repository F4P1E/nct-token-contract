import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { sepolia, polygonMumbai } from "wagmi/chains"

export const config = getDefaultConfig({
  appName: "Neo-Culture Token",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "default",
  chains: [sepolia, polygonMumbai],
  ssr: true,
})
