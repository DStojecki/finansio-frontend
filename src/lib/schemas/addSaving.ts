import * as Yup from 'yup'

export const addSavingSchema = {
    fields: [
        {
            label: 'Saving Name',
            name: 'name',
            as: 'input',
            rules: Yup.string().min(3).required(),
        },
        {
            label: 'Amount',
            name: 'amount',
            as: 'input',
            type: 'number',
            rules: Yup.number().required(),
        },
        {
            label: 'Currency',
            name: 'currency',
            as: 'select',
            rules: Yup.string().required(),
            children: [
                {
                    tag: 'option',
                    value: '',
                    text: '',
                },
                {
                    tag: 'option',
                    value: 'PLN',
                    text: 'PLN',
                },
                {
                    tag: 'option',
                    value: 'USD',
                    text: 'USD',
                },
                {
                    tag: 'option',
                    value: 'EUR',
                    text: 'EUR',
                },
            ],
        },
    ],
}
