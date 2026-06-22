import { Head, Link } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";

// 🌟 1. Definimos el tipo de las Props para recibir el plan desde Laravel
type CancelProps = {
    plan: 'monthly' | 'yearly'
}

export default function Cancel({ plan }: CancelProps) {
    return (
        <AppLayout title="Proceso Cancelado">
            <Head title="Error al pagar" />

            <div className="max-w-xl mx-auto my-12 px-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-xs dark:border-gray-900 dark:bg-gray-950">
                    
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 mb-6">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6 text-red-500 dark:text-red-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-black text-gray-950 dark:text-white tracking-tight">
                        Pago no completado
                    </h2>
                    <p className="mt-3 text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                        No se realizó ningún cargo a tu tarjeta. Si experimentaste algún problema con la pasarela de pagos, puedes volver a intentarlo cuando estés listo.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">

                        <Link 
                            href={`/subscription-checkout/${plan}`} 
                            method="post"
                            as="button"
                            className="inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider text-white bg-gray-950 hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 py-3 px-5 rounded-xl transition-all duration-200 cursor-pointer shadow-xs"
                        >
                            Reintentar pago
                        </Link>
                        <Link 
                            href="/dashboard" 
                            className="inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider text-gray-600 bg-gray-50 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-800 py-3 px-5 rounded-xl transition-all duration-200 cursor-pointer"
                        >
                            Ir al panel de administración
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}