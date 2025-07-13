"use client"

import * as React from "react"
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLine, VictoryPie, VictoryTheme, VictoryLabel } from "victory"

import { cn } from "@/lib/utils"

const Chart = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    type: "bar" | "line" | "pie"
    data: any[]
    x?: string
    y?: string
    title?: string
  }
>(({ className, type, data, x, y, title, ...props }, ref) => {
  const ChartComponent = React.useMemo(() => {
    switch (type) {
      case "bar":
        return <VictoryBar x={x} y={y} />
      case "line":
        return <VictoryLine x={x} y={y} />
      case "pie":
        return <VictoryPie x={x} y={y} />
      default:
        return null
    }
  }, [type, x, y])

  return (
    <div ref={ref} className={cn("w-full h-full", className)} {...props}>
      <VictoryChart theme={VictoryTheme.material}>
        {title && <VictoryLabel text={title} x={225} y={30} textAnchor="middle" />}
        {type !== "pie" && <VictoryAxis />}
        {type !== "pie" && <VictoryAxis dependentAxis />}
        {ChartComponent && React.cloneElement(ChartComponent, { data })}
      </VictoryChart>
    </div>
  )
})
Chart.displayName = "Chart"

export { Chart }
