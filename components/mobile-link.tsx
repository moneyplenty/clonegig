"use client"

import type * as React from "react"
import Link, { type LinkProps } from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

export function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(
        "flex w-full items-center rounded-md p-2 text-lg font-medium hover:underline",
        pathname === href && "bg-accent text-accent-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
