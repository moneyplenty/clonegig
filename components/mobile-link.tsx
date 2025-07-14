"use client"

import type React from "react"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface MobileLinkProps {
  href: string
  pathname: string | null
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

export function MobileLink({ href, pathname, setOpen, children }: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/60 transition-colors hover:text-foreground",
        pathname === href && "text-foreground",
      )}
      onClick={() => setOpen(false)}
    >
      {children}
    </Link>
  )
}
