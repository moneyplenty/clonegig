"use client"

import React from "react"
import { CartesianGrid, Line, LineChart, Bar, BarChart, Area, AreaChart, XAxis, YAxis, Legend } from "recharts"
import { type ChartConfig, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

// Define types for common chart props
interface BaseChartProps {
  data: Record<string, any>[]
  chartConfig: ChartConfig
  className?: string
}

interface LineChartProps extends BaseChartProps {
  lines: {
    dataKey: string
    stroke: string
    strokeWidth?: number
    dot?: boolean
  }[]
}

interface BarChartProps extends BaseChartProps {
  bars: {
    dataKey: string
    fill: string
  }[]
}

interface AreaChartProps extends BaseChartProps {
  areas: {
    dataKey: string
    fill: string
    stroke?: string
  }[]
}

const ChartContainer = React.forwardRef<HTMLDivElement, any>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex aspect-video h-full w-full", className)} {...props} />
))
ChartContainer.displayName = "ChartContainer"

// Line Chart Component
const CustomLineChart: React.FC<LineChartProps> = ({ data, chartConfig, lines, className }) => (
  <ChartContainer config={chartConfig} className={className}>
    <LineChart accessibilityLayer data={data}>
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="month"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={(value) => value.slice(0, 3)}
      />
      <YAxis />
      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      <Legend />
      {lines.map((line, index) => (
        <Line
          key={index}
          dataKey={line.dataKey}
          type="monotone"
          stroke={line.stroke}
          strokeWidth={line.strokeWidth || 2}
          dot={line.dot || false}
        />
      ))}
    </LineChart>
  </ChartContainer>
)

// Bar Chart Component
const CustomBarChart: React.FC<BarChartProps> = ({ data, chartConfig, bars, className }) => (
  <ChartContainer config={chartConfig} className={className}>
    <BarChart accessibilityLayer data={data}>
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="month"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={(value) => value.slice(0, 3)}
      />
      <YAxis />
      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      <Legend />
      {bars.map((bar, index) => (
        <Bar key={index} dataKey={bar.dataKey} fill={bar.fill} />
      ))}
    </BarChart>
  </ChartContainer>
)

// Area Chart Component
const CustomAreaChart: React.FC<AreaChartProps> = ({ data, chartConfig, areas, className }) => (
  <ChartContainer config={chartConfig} className={className}>
    <AreaChart accessibilityLayer data={data}>
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="month"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={(value) => value.slice(0, 3)}
      />
      <YAxis />
      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      <Legend />
      {areas.map((area, index) => (
        <Area key={index} dataKey={area.dataKey} type="monotone" fill={area.fill} stroke={area.stroke || area.fill} />
      ))}
    </AreaChart>
  </ChartContainer>
)

export { CustomLineChart, CustomBarChart, CustomAreaChart }
