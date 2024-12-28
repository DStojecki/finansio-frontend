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
        accessorKey: 'lastUpdate',
        header: () => h('div', 'Last Update'),
        cell: ({ row }) => {
            return h('div', new Date(row.getValue('lastUpdate')).toISOString().split('T')[0])
        },
    },
    {
        accessorKey: 'percentageChange',
        header: () => h('div', 'Percentage Change'),
        cell: ({ row }) => {
            let formatted = ''
            const percentageChange: number = row.getValue('percentageChange')

            if (percentageChange === null) {
                formatted = 'Fresh Record'
            } else if (percentageChange > 0) {
                formatted =
                    '<span class="text-green-600"> &#11016; ' +
                    percentageChange.toString() +
                    '%</span>'
            } else {
                formatted =
                    ' <span class="text-red-600"> &#11018; ' +
                    percentageChange.toString() +
                    '% </span>'
            }
            return h('div', { class: 'font-medium flex justify-between', innerHTML: formatted })
        },
    },
    {
        accessorKey: 'amount',
        header: () => h('div', 'Amount'),
        cell: ({ row }) => {
            const currency = row.getValue('currency')
            const amount = row.getValue('amount')
            let formatted = amount + ' ' + currency

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
