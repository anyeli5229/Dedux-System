import { ReactNode } from "react";
import Header from "../Transactions/components/Header";
import { usePage } from "@inertiajs/react";
import Footer from "../Transactions/components/Footer";

type AuthLayoutProps = {
    children: ReactNode
    title?: string
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
    const { auth } = usePage().props
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

            <Header
                links={[{ label: 'Iniciar Sesión', href: '/auth/login' }]}
                actionLink={{ label: 'Crear Cuenta', href: '/auth/register' }}
                user={auth.user}
            />

            <div className="max-w-6xl w-full mx-auto px-6 py-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10">
                <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                        La forma más inteligente de gestionar tus <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-950 via-gray-600 to-gray-400 dark:from-white dark:via-gray-300 dark:to-gray-600">deducciones.</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto lg:mx-0">
                        Pre-contabilidad automatizada con Inteligencia Artificial.
                    </p>
                </div>
                <div className="w-full lg:w-1/2 flex justify-center">
                    <main className="w-full max-w-md bg-white dark:bg-gray-950 p-8 rounded-2xl border border-gray-100 dark:border-white shadow-xl shadow-gray-40">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 dark:text-white text-center mb-4">
                            {title}
                        </h1>

                        {children}

                    </main>
                </div>
            </div>
            <Footer/>
        </div>
    )
}