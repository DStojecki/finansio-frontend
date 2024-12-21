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

                months.unshift({
                    name: monthLabel,
                    total: Math.floor(Math.random() * 2000) + 500,
                    predicted: Math.floor(Math.random() * 2000) + 500,
                })
            }
            return months
        }

        const yearsCount = Math.ceil(x / 12)
        const years = []
        for (let i = 0; i < yearsCount; i++) {
            years.unshift({
                name: (currentYear - i).toString(),
                total: Math.floor(Math.random() * 2000) + 500,
                predicted: Math.floor(Math.random() * 2000) + 500,
            })
        }

        return years
    }

    return {
        getPastTimeArray,
    }
}
