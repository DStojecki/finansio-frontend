import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DropdownAction from '@/components/savings/SavingsTableDropDown.vue'
import type { HistoryRecord, Saving } from './types/savings'
import { useComparision } from '@/composables/useComparision'

const calculatePercentageChange = useComparision()

export const columns: ColumnDef<Saving>[] = [
    {
        accessorKey: 'name',
        header: () => h('div', 'Name'),
    },
    {
        accessorKey: 'currency',
        header: () => h('div', 'Currency'),
    },
    {
        accessorKey: 'last_update',
        header: () => h('div', 'Last Update'),
        cell: ({ row }) => {
            const history: HistoryRecord[] = row.getValue('history')
            const date = history[history.length - 1].date

            return h('div', new Date(date).toISOString().split('T')[0])
        },
    },
    {
        accessorKey: 'history',
        header: () => h('div', 'Amount'),
        cell: ({ row }) => {
            const history: HistoryRecord[] = row.getValue('history')
            const currency = row.getValue('currency')

            let formatted = history[history.length - 1].amount.toString() + ' ' + currency

            if (history.length > 1) {
                let comparisonPercentage: string | number = calculatePercentageChange(
                    history[history.length - 2].amount,
                    history[history.length - 1].amount,
                )

                if (comparisonPercentage > 0) {
                    comparisonPercentage =
                        '<span class="text-green-600"> &#11016; ' +
                        comparisonPercentage.toString() +
                        '%</span>'
                } else {
                    comparisonPercentage =
                        ' <span class="text-red-600"> &#11018; ' +
                        comparisonPercentage.toString() +
                        '% </span>'
                }

                formatted += comparisonPercentage
            }

            return h('div', { class: 'font-medium flex justify-between', innerHTML: formatted })
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const saving = row.original

            return h(
                'div',
                { class: 'relative' },
                h(DropdownAction, {
                    saving,
                }),
            )
        },
    },
]
