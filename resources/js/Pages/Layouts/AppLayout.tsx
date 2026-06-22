import { ReactNode, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '../Transactions/components/Header';
import { toast, ToastContainer } from 'react-toastify';
import Footer from '../Transactions/components/Footer';

type AppLayoutProps = {
    children: ReactNode
    title?: string
    actions?: ReactNode
}

export default function AppLayout({ children, title, actions }: AppLayoutProps) {
    const { auth, flash } = usePage().props

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success)
        }

        if (flash.error) {
            toast.error(flash.error)
        }
    }, [flash])
    
    return (
        <>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col antialiased transition-colors duration-200">

                <Header user={auth.user} />
                {flash.success && (
                    <div className="max-w-5xl mx-auto w-full px-6 mb-5">
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm font-medium shadow-xs dark:bg-emerald-950/30 dark:border-emerald-900/60 dark:text-emerald-400">
                            {flash.success}
                        </div>
                    </div>
                )}

                <main className="grow w-full mx-auto max-w-6xl px-6">
                    {(title || actions) && (
                        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                {title && <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">{title}</h1>}
                            </div>
                            {actions && <div className="flex items-center gap-3">{actions}</div>}
                        </div>
                    )}

                    {children}
                </main>

            </div>
                <Footer/>
            
            <ToastContainer
                position="top-right"
                autoClose={4000}
            />
        </>
    )
}