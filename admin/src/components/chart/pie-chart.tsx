'use client'

import { Pie, PieChart } from 'recharts'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import PieChartSkeleton from './pie-chart-skeleton'

export interface IChartData {
  label: string
  amount: number
}

interface IFinalChartData {
  [key: string]: string | number
  amount: number
  fill: string
}

type DataPieChartProps = {
  title: string
  nameKey: string
  chartData: IChartData[]
  isLoading?: boolean
  className?: string
}

const DataPieChart = ({
  title,
  nameKey,
  chartData,
  isLoading,
  className
}: DataPieChartProps) => {
  const [displayedChartData, setDisplayedChartData] = useState<
    IFinalChartData[]
  >([])
  const [chartConfig, setChartConfig] = useState({} satisfies ChartConfig)

  const getChartData = () => {
    const finalChartData: IFinalChartData[] = chartData.map((item) => ({
      [nameKey]: item.label,
      amount: item.amount,
      fill: `var(--color-${item.label})`
    }))

    const chartConfig = chartData.reduce(
      (acc, { label }, index) => {
        acc[label] = {
          label: label.charAt(0).toUpperCase() + label.slice(1), // Capitalize
          color: `hsl(var(--chart-${(index % 5) + 1}))` // Reset color index after 5
        }

        return acc
      },
      {} as Record<string, { label: string; color: string }>
    )

    setDisplayedChartData(finalChartData)
    setChartConfig({
      amount: {
        label: 'Amount'
      },
      ...chartConfig
    })
  }

  useEffect(() => {
    getChartData()
  }, [chartData])

  if (isLoading) return <PieChartSkeleton className={className} />

  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <CardHeader className='items-center pb-0'>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 p-4 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-full'
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey='amount' hideLabel />}
            />
            <Pie data={displayedChartData} dataKey='amount' />
            <ChartLegend
              content={<ChartLegendContent nameKey={nameKey} />}
              className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center'
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default DataPieChart
