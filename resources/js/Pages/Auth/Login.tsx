import AuthLayout from '../Layouts/AuthLayout'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import LoginForm from './LoginForm'
import { LoginFieldsForm } from '@/types/auth'
import Alert from '../Transactions/components/Alert'

const title = 'Iniciar Sesión'

export default function Login() {

    const { flash } = usePage().props

    const { data, setData, processing, post, errors } = useForm<LoginFieldsForm>({
        email: '',
        password: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/auth/login', { preserveScroll: true })
    }

    const handleDemoLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        
        setData({
            email: 'demo@dedux.com',
            password: 'DeduxDemo2026'
        })


        router.post('/auth/login', {
            email: 'demo@dedux.com',
            password: 'DeduxDemo2026'
        }, { preserveScroll: true })
    }

    return (
        <AuthLayout title={`${title}`}>
            <Head title={`${title}`} />

            <div className='w-full'>
                <div className='text-center mb-6'>
                    <h1 className='text-2xl font-black tracking-tight text-gray-900 dark:text-white'>Bienvenido de vuelta.</h1>
                    <p className='text-gray-500 dark:text-gray-400 text-sm mt-1'>Ingresa tus credenciales para acceder a Dedux.</p>
                </div>

                <Alert type="error" message={flash?.error} />
                <Alert message={flash?.success} />

                <form onSubmit={handleSubmit} className="space-y-4">
                    <LoginForm
                        data={data}
                        setData={setData}
                        errors={errors}
                    />

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-gray-950 hover:bg-gray-900 dark:hover:bg-gray-950 dark:hover:text-white dark:bg-white dark:text-gray-950 dark:hover:border-white border disabled:bg-gray-400 w-full p-3.5 rounded-xl text-white font-semibold text-base cursor-pointer transition-all mt-6 shadow-sm tracking-wide text-center"
                    >
                        {processing ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                    </button>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-300 dark:border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                                ¿Quieres probarla?
                            </span>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleDemoLogin}
                        disabled={processing}
                        className="w-full border border-black dark:border-white text-black dark:text-white p-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition font-semibold text-base shadow-sm tracking-wide text-center disabled:opacity-50 cursor-pointer"
                    >
                        Ingresar como Usuario Demo
                    </button>
                </form>
            </div>

        </AuthLayout>
    )
}