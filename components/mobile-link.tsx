"use client"

import type React from "react"
import Link, { type LinkProps } from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

export function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false)
      }}
      className={cn(
        "flex items-center gap-2 p-2 text-lg font-medium",
        pathname === href && "bg-accent text-accent-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
