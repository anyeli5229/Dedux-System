
import AuthLayout from '../Layouts/AuthLayout'
import { Head, useForm } from '@inertiajs/react'
import RegisterForm from './RegisterForm'
import { RegisterFieldForm } from '@/types/auth'

const title = 'Crear Cuenta'

export default function Login() {

    const { data, setData, processing, post, errors } = useForm<RegisterFieldForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        post('/auth/register', { preserveScroll: true })
    }

    return (
        <AuthLayout title={`${title}`}>
            <Head title={`${title}`} />

            <div className='w-full'>
                <div className='text-center mb-6'>
                    <h1 className='text-2xl font-black tracking-tight text-gray-900 dark:text-white'>Comienza con Dedux.</h1>
                    <p className='text-gray-500 dark:text-gray-400 text-sm mt-1'>Automatiza tus deducciones fiscales en minutos.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <RegisterForm
                        data={data}
                        setData={setData}
                        errors={errors}
                    />

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-gray-950 hover:bg-gray-900 dark:hover:bg-gray-950 dark:hover:text-white  dark:bg-white dark:text-gray-950 dark:hover:border-white border disabled:bg-gray-400 w-full p-3.5 rounded-xl text-white font-semibold text-base cursor-pointer transition-all mt-6 shadow-sm tracking-wide text-center"
                    >
                        {processing ? 'Creando Cuenta...' : 'Crear Cuenta'}
                    </button>
                </form>
            </div>

        </AuthLayout>
    )
}
