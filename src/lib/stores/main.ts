import type { Saving } from '@/common/types/savings'
import { defineStore } from 'pinia'
import { useSavings } from '@/composables/useSavings'

const { getTotalSavings } = useSavings()

export interface MainStore {
    savings: Saving[]
    totalAmount: number
    currency: string
    timeRange: string
}

export const useMainStore = defineStore({
    id: 'main',
    state: (): MainStore => ({
        savings: [],
        totalAmount: 0,
        currency: 'PLN',
        timeRange: '12',
    }),
    actions: {
        countTotalAmount() {
            this.totalAmount = getTotalSavings(this.currency, this.savings)
        },
    },
})
