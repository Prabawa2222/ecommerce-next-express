'use client'

import { ChevronDown, ChevronsLeftRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { useIsMobile } from '@/hooks/use-mobile'
import { useIsDesktop } from '@/hooks/use-desktop'
import { cn } from '@/lib/utils'
import { MonthType } from '@/lib/types/types'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import ChartSkeleton from './data-chart-skeleton'

export type ChartDataType = Record<
  number,
  { month: MonthType; amount: number }[]
>

interface IChartData {
  data: ChartDataType
  existYears: number[]
  selectedYear: number
}

type DataChartProps = {
  title: string
  label: string
  className?: string
  chart: IChartData
}

const DataChart = ({ title, label, className, chart }: DataChartProps) => {
  const isMobile = useIsMobile()
  const isDesktop = useIsDesktop()

  const [selectedYear, setSelectedYear] = useState<number>(0)
  const [mobileChartDataIndex, setMobileChartDataIndex] = useState<0 | 1>(0)

  const chartConfig = {
    amount: {
      label: label,
      color: 'hsl(var(--chart-1))'
    }
  } satisfies ChartConfig

  useEffect(() => {
    setSelectedYear(chart.selectedYear)
  }, [chart])

  if (!selectedYear) return <ChartSkeleton className={cn(className)} />

  return (
    <Card className={cn('p-4 md:p-6', className)}>
      <CardHeader className='flex flex-row items-start justify-between p-0'>
        <CardTitle className='text-sm font-semibold'>{title}</CardTitle>
        <div className='flex items-center justify-center gap-2'>
          <Button
            variant='ghost'
            onClick={() =>
              setMobileChartDataIndex(mobileChartDataIndex === 0 ? 1 : 0)
            }
            className='md:hidden'
            asChild
          >
            <ChevronsLeftRight />
          </Button>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost'>
                {selectedYear} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-fit min-w-0'>
              {chart.existYears.length > 0 &&
                chart.existYears.map((year) => (
                  <DropdownMenuItem
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className='p-4'
                  >
                    {year}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <ChartContainer
        config={chartConfig}
        className='h-[320px] min-h-[300px] w-full'
      >
        <BarChart
          accessibilityLayer
          data={
            isMobile && mobileChartDataIndex === 0
              ? chart.data[selectedYear]?.slice(0, 6)
              : isMobile && mobileChartDataIndex === 1
                ? chart.data[selectedYear]?.slice(6, 12)
                : chart.data[selectedYear]
          }
          barSize={isMobile ? '12%' : '6%'}
          margin={{ left: 8, top: 16, right: 8, bottom: 8 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='month'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          {isDesktop && (
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={70}
              tickFormatter={(value) => Number(value).toLocaleString('id-ID')}
              fontSize={10}
            />
          )}

          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey='amount' fill='var(--color-amount)' radius={2} />
        </BarChart>
      </ChartContainer>
    </Card>
  )
}

export default DataChart
