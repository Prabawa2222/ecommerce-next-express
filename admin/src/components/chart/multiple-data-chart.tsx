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

export type DataValueType = {
  month: MonthType
  amount: number
}

export type DataType = {
  year: string
  values: DataValueType[]
}

export type ChartDataType = {
  category: string
  data: DataType[]
}[]

type MultipleDataChartProps = {
  title: string
  label: string
  className?: string
  chartData: ChartDataType
}

const MultipleDataChart = ({
  title,
  label,
  className,
  chartData
}: MultipleDataChartProps) => {
  const isMobile = useIsMobile()
  const isDesktop = useIsDesktop()

  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('tshirt')
  const [years, setYears] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [mobileChartDataIndex, setMobileChartDataIndex] = useState<0 | 1>(0)
  const [displayedChartData, setDisplayedChartData] = useState<DataValueType[]>(
    []
  )

  const chartConfig = {
    amount: {
      label: label,
      color: 'hsl(var(--chart-1))'
    }
  } satisfies ChartConfig

  const getInitialCategories = () => {
    if (chartData?.length > 0) {
      const chartCategories = chartData.map((data) => data.category)

      setCategories(chartCategories)
      setSelectedCategory(chartCategories[chartCategories.length - 1])
    }
  }

  const getInitialYears = () => {
    const data = chartData?.find((data) => data.category === selectedCategory)

    if (data) {
      const existYears = data?.data.map((item) => item.year)

      setYears(existYears)
      setSelectedYear(existYears[existYears.length - 1])
    }
  }

  const getDisplayedChartData = () => {
    const dataBySelectedCategory = chartData.find(
      (item) => item.category === selectedCategory
    )
    const valueBySelectedYear = dataBySelectedCategory?.data.find(
      (item) => item.year === selectedYear
    )?.values

    if (valueBySelectedYear) {
      if (isMobile && mobileChartDataIndex === 0) {
        return setDisplayedChartData(valueBySelectedYear?.slice(0, 6))
      }

      if (isMobile && mobileChartDataIndex === 1) {
        return setDisplayedChartData(valueBySelectedYear?.slice(6, 12))
      }

      return setDisplayedChartData(valueBySelectedYear)
    }
  }

  useEffect(() => {
    getInitialCategories()
  }, [chartData])

  useEffect(() => {
    getInitialYears()
  }, [selectedCategory])

  useEffect(() => {
    getDisplayedChartData()
  }, [
    chartData,
    categories,
    selectedCategory,
    years,
    selectedYear,
    isMobile,
    isDesktop,
    mobileChartDataIndex
  ])

  if (displayedChartData.length === 0)
    return <ChartSkeleton className={cn(className)} />

  return (
    <Card className={cn('p-4 md:p-6', className)}>
      <CardHeader className='flex flex-col items-start justify-between gap-4 p-0 sm:flex-row'>
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
              <Button variant='ghost' className='capitalize'>
                {selectedCategory} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-fit min-w-0'>
              {categories.length > 0 &&
                categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className='p-4 capitalize'
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost'>
                {selectedYear} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-fit min-w-0'>
              {years.length > 0 &&
                years.map((year) => (
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
          data={displayedChartData}
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

export default MultipleDataChart
