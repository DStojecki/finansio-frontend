export type Savings = Saving[]

export interface Saving {
    id: string
    currency: string
    name: string
    amount: number
}

export interface AddSavingInputs {
    name: string
    amount: number
    currency: string
}

export interface HistoryRecord {
    date: Date
    amount: number
}

export interface SavingChartData {
    name: string
    total: number
    predicted: number
}
