"use client"

import * as React from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"
import { cn } from "@/lib/utils"

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  type: "line" | "bar" | "area"
  xAxisKey: string
  yAxisKey: string | string[]
  tooltip?: boolean
  legend?: boolean
  grid?: boolean
  colors?: string[]
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      data,
      type,
      xAxisKey,
      yAxisKey,
      tooltip = true,
      legend = true,
      grid = true,
      colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"],
      className,
      ...props
    },
    ref,
  ) => {
    const ChartComponent = type === "line" ? LineChart : type === "bar" ? BarChart : AreaChart
    const DataComponent = type === "line" ? Line : type === "bar" ? Bar : Area

    const yKeys = Array.isArray(yAxisKey) ? yAxisKey : [yAxisKey]

    return (
      <div ref={ref} className={cn("h-[400px] w-full", className)} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={data}>
            {grid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            {tooltip && <Tooltip />}
            {legend && <Legend />}
            {yKeys.map((key, index) => (
              <DataComponent
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                fill={type === "area" ? colors[index % colors.length] : undefined}
              />
            ))}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    )
  },
)
Chart.displayName = "Chart"

export { Chart }
