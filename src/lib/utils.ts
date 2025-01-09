import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getMonthAndYear = () => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() // 0-11
  const currentYear = currentDate.getFullYear()
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1 // 0-11
  const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear

  return {
    currentMonth,
    currentYear,
    lastMonth,
    lastYear
  }
}

export const filterDataByMonth = <T extends { createdAt: string }>(
  items: T[],
  option: 'currentMonth' | 'lastMonth'
): T[] => {
  const { currentMonth, currentYear, lastMonth, lastYear } = getMonthAndYear()

  const month = option === 'currentMonth' ? currentMonth : lastMonth
  const year = option === 'currentMonth' ? currentYear : lastYear

  return items.filter((item) => {
    const itemDate = new Date(item.createdAt)
    return itemDate.getMonth() === month && itemDate.getFullYear() === year
  })
}

export const formatToRupiah = (amount: number): string => {
  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)

  return formattedAmount
}

export const formatDateForTable = (date: Date): string => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
    .format(date)
    .replace(' at ', ', ')

  return formattedDate
}
