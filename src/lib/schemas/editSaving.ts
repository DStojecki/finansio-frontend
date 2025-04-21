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
    ],
}
