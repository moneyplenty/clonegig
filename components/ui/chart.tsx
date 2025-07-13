"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Workaround for https://github.com/recharts/recharts/issues/3615
const use = RechartsPrimitive.ResponsiveContainer // eslint-disable-next-line @typescript-eslint/no-unused-vars

const ChartContext = React.createContext<{
  config: ChartConfig
} | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <Chart />")
  }

  return context
}

type ChartConfig = {
  [k: string]: {
    label?: string
    icon?: React.ComponentType
  } & ({ color?: string; theme?: never } | { color?: never; theme: string })
}

type ChartContainerProps = {
  config: ChartConfig
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<"div">

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, className, children, ...props }, ref) => {
    const newChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === RechartsPrimitive.ResponsiveContainer) {
          return React.cloneElement(child, {
            className: cn("w-full", child.props.className),
          } as React.ComponentPropsWithoutRef<typeof RechartsPrimitive.ResponsiveContainer>)
        }
      }
      return child
    })

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          ref={ref}
          className={cn("flex h-[300px] w-full flex-col items-center justify-center overflow-hidden", className)}
          {...props}
        >
          {newChildren}
        </div>
      </ChartContext.Provider>
    )
  },
)
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ChartTooltip> &
    React.ComponentPropsWithoutRef<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      isActive?: boolean
    }
>(({ hideLabel, hideIndicator, isActive, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {/* Tooltip content goes here */}
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"
</merged_code>
