"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const chartVariants = cva("w-full", {
  variants: {
    size: {
      default: "h-[200px]",
      sm: "h-[150px]",
      lg: "h-[300px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chartVariants> {
  asChild?: boolean
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(({ className, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"
  return <Comp className={cn(chartVariants({ size, className }))} ref={ref} {...props} />
})
Chart.displayName = "Chart"

export { Chart, chartVariants }
