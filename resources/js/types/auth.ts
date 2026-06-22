export type LoginFieldsForm = {
    email: string
    password: string
}

export type RegisterFieldForm = {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export type ForgotPasswordFieldsForm = Pick<RegisterFieldForm, 'email'>

export type ResetPasswordFieldsForm = Pick<RegisterFieldForm, 'password' | 'password_confirmation'>