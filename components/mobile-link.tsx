"use client"

import Link, { type LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import type * as React from "react"

import { cn } from "@/lib/utils"

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

export function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const router = usePathname()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
