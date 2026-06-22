import React from 'react'
import { useForm, usePage } from '@inertiajs/react'
import AuthLayout from '../Layouts/AuthLayout'
import Alert from '../Transactions/components/Alert'

export default function VerifyEmail() {
    const { flash } = usePage().props
    const { post, processing } = useForm({})

    const handleResendEmail = (e: React.SubmitEvent) => {
        e.preventDefault()
        post('/email/verification-notificaction') 
    }

    return (
        <AuthLayout>
            <div className="max-w-md mx-auto my-12 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm dark:bg-gray-900 dark:border-gray-800">
                <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-4 text-center">
                    Verifica tu correo electrónico
                </h2>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center leading-relaxed">
                    ¡Gracias por registrarte en Dedux! Antes de comenzar, por favor verifica tu cuenta haciendo clic en el enlace que te enviamos a tu correo. Si no lo recibiste, con gusto te enviamos otro.
                </p>

                <Alert message={flash?.success} />

                <form onSubmit={handleResendEmail} className="flex flex-col gap-3">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full bg-gray-950 text-white p-3 rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        {processing ? 'Enviando...' : 'Reenviar correo de verificación'}
                    </button>
                </form>
            </div>
        </AuthLayout>
    )
}