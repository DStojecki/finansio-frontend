import * as Yup from 'yup'

export const addSavingHistory = {
    fields: [
        {
            label: 'Amount',
            name: 'amount',
            as: 'input',
            type: 'number',
            rules: Yup.number().required(),
        },
        {
            label: 'Created At',
            type: 'date',
            name: 'created_at',
            as: 'input',
            rules: Yup.date().required(),
        },
    ],
}
