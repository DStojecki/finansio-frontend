import * as Yup from 'yup'

export const editSavingSchema = {
    fields: [
        {
            label: 'Saving Name',
            name: 'name',
            as: 'input',
            rules: Yup.string().min(3).required(),
        },
        {
            label: 'New Amount',
            name: 'amount',
            as: 'input',
            type: 'number',
            rules: Yup.number(),
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
            ],
        },
    ],
}
