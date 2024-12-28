import type { AddSavingInputs, Saving } from '@/common/types/savings'
import axios from '@/lib/axios'

export const useSavings = (): {
    getAllSavings: () => Promise<Saving[]>
    addNewSaving: (values: AddSavingInputs, actions: any, onSuccess: any) => Promise<void>
    getTotalSavings: (currency: string, savings: Saving[]) => number
} => {
    const addNewSaving = async (
        values: AddSavingInputs,
        actions: any,
        onSuccess: any,
    ): Promise<void> => {
        const payload = {
            name: values.name,
            currency: values.currency,
            amount: values.amount,
        }

        axios
            .post('/savings', payload)
            .then(async function (response) {
                onSuccess()
            })
            .catch(function (error) {
                const errorMessage = error.response.data

                actions.setFieldError(errorMessage.field, errorMessage.message)
            })
    }

    const getAllSavings = async (): Promise<Saving[]> => {
        let data: Saving[] = []
        await axios.get('savings').then(function (response) {
            data = response.data
        })
        return data
    }

    const getTotalSavings = (currency: string, savings: Saving[]): number => {
        // let total = 0

        // const arrayMatchCurrency = savings.filter((el) => el.currency === currency)
        // const arrayDontMatchCurrency = savings.filter((el) => el.currency !== currency)

        // arrayMatchCurrency.forEach((el) => {
        //     const lastHistoryRecord = el.history[el.history.length - 1]

        //     total += lastHistoryRecord.amount
        // })

        // arrayDontMatchCurrency.forEach((el) => {
        //     const lastHistoryRecord = el.history[el.history.length - 1]

        //     if (currency === 'USD') {
        //         total += lastHistoryRecord.amount / 4.04
        //     } else if (currency === 'PLN') {
        //         total += lastHistoryRecord.amount * 4.04
        //     }
        // })

        // return Number(total.toFixed(2))

        return 2000
    }

    return {
        getAllSavings,
        addNewSaving,
        getTotalSavings,
    }
}
