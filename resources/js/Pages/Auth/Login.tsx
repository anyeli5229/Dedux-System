
import AuthLayout from '../Layouts/AuthLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
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

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        post('/auth/login', { preserveScroll: true })
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
                        className="bg-gray-950 hover:bg-gray-900 dark:hover:bg-gray-950 dark:hover:text-white  dark:bg-white dark:text-gray-950 dark:hover:border-white border disabled:bg-gray-400 w-full p-3.5 rounded-xl text-white font-semibold text-base cursor-pointer transition-all mt-6 shadow-sm tracking-wide text-center"
                    >
                        {processing ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>
            </div>

        </AuthLayout>
    )
}
