"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ConnectWalletButton } from "./web3/connect-wallet-button"
import { cn } from "@/lib/utils"
import Image from "next/image"

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/swap", label: "Swap" },
  { href: "/market", label: "Market" },
  { href: "/mint", label: "Mint" },
  { href: "/rewards", label: "Rewards" },
  { href: "/profile", label: "Profile" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-lg text-foreground hover:opacity-80 transition-opacity"
        >
          <Image src="/neo-culture-tech-logo.png" alt="Neo Culture Tech" width={40} height={40} className="h-10 w-10" />
          <span className="hidden sm:inline">
            Neo Culture <span className="text-accent">Tech</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                pathname === item.href
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <ConnectWalletButton />
      </div>
    </nav>
  )
}
