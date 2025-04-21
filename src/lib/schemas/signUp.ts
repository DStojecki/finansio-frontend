import * as Yup from 'yup'

export const signUpFormSchema = {
    fields: [
        {
            label: 'Your Email',
            name: 'email',
            as: 'input',
            rules: Yup.string().email().required(),
        },
        {
            label: 'Your Password',
            name: 'password',
            as: 'input',
            type: 'password',
            rules: Yup.string().min(8).required(),
        },
    ],
}
