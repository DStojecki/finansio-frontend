import * as Yup from 'yup'

export const registerSchema = {
    fields: [
        {
            label: 'First Name',
            name: 'firstName',
            as: 'input',
            rules: Yup.string()
                .required('First name is required')
                .min(2, 'First name must be at least 2 characters')
                .max(50, 'First name must not exceed 50 characters'),
        },
        {
            label: 'Last Name',
            name: 'lastName',
            as: 'input',
            rules: Yup.string()
                .required('Last name is required')
                .min(2, 'Last name must be at least 2 characters')
                .max(50, 'Last name must not exceed 50 characters'),
        },
        {
            label: 'Email',
            name: 'email',
            as: 'input',
            type: 'email',
            rules: Yup.string()
                .required('Email is required')
                .email('Please enter a valid email address'),
        },
        {
            label: 'Password',
            name: 'password',
            as: 'input',
            type: 'password',
            rules: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters')
                // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                // .matches(/[0-9]/, 'Password must contain at least one number'),
        },
        {
            label: 'Confirm Password',
            name: 'confirmPassword',
            as: 'input',
            type: 'password',
            rules: Yup.string()
                .required('Please confirm your password')
                // .oneOf([Yup.ref('password')], 'Passwords must match'),
        }
    ],
} 