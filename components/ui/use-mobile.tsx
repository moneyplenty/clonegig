"use client"

import * as React from "react"

import { useMediaQuery } from "@/hooks/use-mobile"

export function useMobile() {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    setIsMobile(!isDesktop)
  }, [isDesktop])

  return isMobile
}
