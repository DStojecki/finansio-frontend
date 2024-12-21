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
            label: 'Date',
            type: 'date',
            name: 'date',
            as: 'input',
            rules: Yup.date().required(),
        },
    ],
}
