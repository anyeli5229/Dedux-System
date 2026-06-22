import AuthLayout from '../Layouts/AuthLayout'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { ResetPasswordFieldsForm } from '@/types/auth'
import ErrorMessage from '../Transactions/components/ErrorMessage'
import Alert from '../Transactions/components/Alert'

type ResetPasswordProps = {
    token: string
    email: string
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const title = 'Nueva contraseña'
    const { flash } = usePage().props

    const { data, setData, processing, post, errors } = useForm<ResetPasswordFieldsForm & { token: string; email: string }>({
        token: token,
        email: email,
        password: '',
        password_confirmation: ''
    })

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        post('/auth/reset-password', { preserveScroll: true })
    }

    return (
        <AuthLayout title={title}>
            <Head title={title} />

            <div className='w-full'>
                <div className='text-center mb-6'>
                    <h1 className='text-2xl font-black tracking-tight text-gray-950 dark:text-white'>
                        Actualiza tu contraseña
                    </h1>
                    <p className='text-gray-500 dark:text-gray-400 text-sm mt-1.5 leading-relaxed max-w-xs mx-auto'>
                        Elige una nueva combinación segura para proteger tu cuenta de Dedux.
                    </p>
                </div>

                <Alert type='error' message={flash?.error} />

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    
                    <input type="hidden" name="token" value={data.token} />
                    <input type="hidden" name="email" value={data.email} />


                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400" htmlFor="password">
                            Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Mínimo 8 caracteres"
                            className={`w-full text-sm font-medium border p-3 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 bg-transparent focus:outline-hidden focus:ring-2 transition-all ${
                                errors.password
                                    ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                                    : 'border-gray-200 dark:border-gray-800 focus:ring-cyan-500/20 focus:border-cyan-500'
                            }`}
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                        />

                        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                    </div>

                    {/* Campo: Confirmar Contraseña */}
                    <div className="flex flex-col gap-1.5">
                        {/* Corregido el htmlFor de "email" a "password_confirmation" */}
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400" htmlFor="password_confirmation">
                            Confirma tu Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            placeholder="Confirma tu contraseña"
                            className={`w-full text-sm font-medium border p-3 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 bg-transparent focus:outline-hidden focus:ring-2 transition-all ${
                                errors.password_confirmation
                                    ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                                    : 'border-gray-200 dark:border-gray-800 focus:ring-cyan-500/20 focus:border-cyan-500'
                            }`}
                            value={data.password_confirmation}
                            onChange={e => setData('password_confirmation', e.target.value)}
                        />

                        {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation}</ErrorMessage>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-gray-950 hover:bg-gray-900 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 disabled:bg-gray-400 w-full p-3.5 rounded-xl text-white font-black text-xs uppercase tracking-wider cursor-pointer transition-all mt-6 shadow-sm text-center"
                    >
                        {processing ? 'Restableciendo...' : 'Restablecer Contraseña'}
                    </button>

                    <div className="text-center mt-4">
                        <Link
                            href="/auth/login"
                            className="text-xs font-bold text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            Volver al inicio de sesión
                        </Link>
                    </div>
                </form>
            </div>
        </AuthLayout>
    )
}