import { ref } from 'vue'
import type { SavingChartData } from '@/common/types/savings'

export function useDateFormatters() {
    const monthNames = ref([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ])

    function getPastTimeArray(x: number, includeYear: boolean = true): SavingChartData[] {
        const now = new Date()
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()

        if (x <= 12) {
            const months = []
            for (let i = 0; i < x; i++) {
                const offsetMonth = (currentMonth - i) % 12
                const monthIndex = offsetMonth < 0 ? offsetMonth + 12 : offsetMonth
                const yearOffset = Math.floor((currentMonth - i) / 12)
                const monthYear = currentYear + yearOffset

                const monthLabel = includeYear
                    ? `${monthNames.value[monthIndex]} ${monthYear}`
                    : monthNames.value[monthIndex]

                const lastDayOfMonth = new Date(monthYear, monthIndex + 1, 0)

                months.unshift({
                    name: monthLabel,
                    total: 0,
                    predicted: 0,
                    timestamp: lastDayOfMonth,
                })
            }
            return months
        }

        const yearsCount = Math.ceil(x / 12)
        const years = []

        for (let i = 0; i < yearsCount; i++) {
            const year = currentYear - i
            const lastDayOfYear = new Date(year, 11, 31)

            years.unshift({
                name: year.toString(),
                total: 0,
                predicted: 0,
                timestamp: lastDayOfYear,
            })
        }

        return years
    }

    return {
        getPastTimeArray,
    }
}
