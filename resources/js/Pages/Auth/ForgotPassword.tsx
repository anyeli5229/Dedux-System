import AuthLayout from '../Layouts/AuthLayout'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { ForgotPasswordFieldsForm } from '@/types/auth'
import ErrorMessage from '../Transactions/components/ErrorMessage'
import Alert from '../Transactions/components/Alert'

export default function ForgotPassword() {

    const { flash } = usePage().props

    const { data, setData, processing, post, errors } = useForm<ForgotPasswordFieldsForm>({
        email: ''
    })

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        post('/auth/forgot-password', { preserveScroll: true })
    }

    return (
        <AuthLayout title='Recuperar Acceso'>
            <Head title='Olvidé mi contraseña' />

            <div className='w-full'>
                <div className='text-center mb-6'>
                    <h1 className='text-2xl font-black tracking-tight text-gray-950 dark:text-white'>
                        ¿Olvidaste tu contraseña?
                    </h1>
                    <p className='text-gray-500 dark:text-gray-400 text-sm mt-1.5 leading-relaxed max-w-xs mx-auto'>
                        No te preocupes. Ingresa tu correo y te enviaremos las instrucciones para restablecerla.
                    </p>
                </div>

                <Alert message={flash?.success} />

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                    <div className="flex flex-col gap-1.5">
                        {/* 🌟 Label alineado a la estética de Ajustes: pequeño, bold y tracking wide */}
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="ejemplo@correo.com"
                            className={`w-full text-sm font-medium border p-3 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 bg-transparent focus:outline-hidden focus:ring-2 transition-all ${
                                errors.email 
                                    ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                                    : 'border-gray-200 dark:border-gray-800 focus:ring-cyan-500/20 focus:border-cyan-500'
                            }`}
                            value={data.email}
                            onChange={e => setData('email', e.target.value)} 
                        />

                        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-gray-950 hover:bg-gray-900 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 disabled:bg-gray-400 w-full p-3.5 rounded-xl text-white font-black text-xs uppercase tracking-wider cursor-pointer transition-all mt-6 shadow-sm text-center"
                    >
                        {processing ? 'Enviando...' : 'Enviar Instrucciones'}
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