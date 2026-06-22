import { router } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';

export default function PricingTable() {
    const [loading, setLoading] = useState<string | null>(null)

    const subscribe = (plan: 'monthly' | 'yearly') => {
        setLoading(plan)
        router.post(`/subscription-checkout/${plan}`, {}, {
            onError: (errors) => {
                console.error("Error en el checkout:", errors)
                setLoading(null)
            },
            onFinish: () => setLoading(null)
        })
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 text-center">
            <div className="max-w-3xl mx-auto mb-16">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-black tracking-widest text-cyan-400 bg-cyan-950/50 border border-cyan-800/30 uppercase mb-4">
                    Planes Dedux Pro
                </span>
                <h2 className="font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-gray-950 dark:text-white leading-tight">
                    Actualiza tu cuenta a Pro y descubre funciones increíbles.
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    Accede a un asistente con IA que te ayuda a gestionar tus gastos: conversa con él y sube imágenes de tus tickets para escanearlos y registrarlos automáticamente.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">

                <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-8 text-left transition-all duration-300 shadow-xs hover:border-gray-300 dark:border-gray-500 dark:bg-gray-950 dark:hover:border-gray-700 relative">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                            Suscripción Estándar
                        </span>
                        <h3 className="text-2xl font-black text-gray-950 dark:text-white mt-1">
                            Mensual
                        </h3>
                        <p className="mt-4 flex items-baseline gap-1">
                            <span className="text-5xl font-black tracking-tight text-gray-950 dark:text-white">$99</span>
                            <span className="text-sm font-semibold text-gray-400 dark:text-gray-500">MXN / mes</span>
                        </p>

                        <ul className="mt-8 space-y-4 text-sm font-medium text-gray-600 dark:text-gray-400 border-t border-gray-100 pt-6 dark:border-gray-900">
                            <li className="flex items-center gap-2.5">
                                <span className="text-cyan-500 font-bold">✓</span> Asistente AI ilimitado
                            </li>
                            <li className="flex items-center gap-2.5">
                                <span className="text-cyan-500 font-bold">✓</span> Escaneo de tickets e imágenes
                            </li>
                            <li className="flex items-center gap-2.5">
                                <span className="text-cyan-500 font-bold">✓</span> Cancela cuando quieras
                            </li>
                        </ul>
                    </div>

                    <button
                        onClick={() => subscribe('monthly')}
                        disabled={loading !== null}
                        className="mt-8 w-full inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider text-gray-900 bg-gray-100 hover:bg-gray-200 dark:text-white dark:bg-gray-900 dark:hover:bg-gray-800 py-3.5 px-5 rounded-xl shadow-xs transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                    >
                        {loading === 'monthly' ? 'Procesando...' : 'Obtener PRO Mensual'}
                    </button>
                </div>

                <div className="flex flex-col justify-between rounded-2xl border-2 border-gray-950 bg-white p-8 text-left transition-all duration-300 shadow-md dark:border-white dark:bg-gray-950 relative overflow-hidden">
                    <span className="absolute -top-1 -right-1 bg-linear-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-bl-xl shadow-sm">
                        2 Meses Gratis
                    </span>

                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                            Recomendado
                        </span>
                        <h3 className="text-2xl font-black text-gray-950 dark:text-white mt-1">
                            Anual
                        </h3>
                        <div className="mt-4">
                            <p className="flex items-baseline gap-1">
                                <span className="text-5xl font-black tracking-tight text-gray-950 dark:text-white">$990</span>
                                <span className="text-sm font-semibold text-gray-400 dark:text-gray-500">MXN / año</span>
                            </p>
                            <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 mt-1 bg-cyan-50 dark:bg-cyan-950/30 inline-block px-2 py-0.5 rounded-md">
                                Equivale a $82.50 MXN / mes
                            </p>
                        </div>

                        <ul className="mt-8 space-y-4 text-sm font-medium text-gray-600 dark:text-gray-400 border-t border-gray-100 pt-6 dark:border-gray-900">
                            <li className="flex items-center gap-2.5">
                                <span className="text-cyan-500 font-bold">✓</span> Todo lo del plan mensual
                            </li>
                            <li className="flex items-center gap-2.5">
                                <span className="text-cyan-500 font-bold">✓</span> Ahorro del 20% anual
                            </li>
                            <li className="flex items-center gap-2.5">
                                <span className="text-cyan-500 font-bold">✓</span> Soporte prioritario dedicado
                            </li>
                        </ul>
                    </div>

                    <button
                        onClick={() => subscribe('yearly')}
                        disabled={loading !== null}
                        className="mt-8 w-full inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider text-white bg-gray-950 hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 py-3.5 px-5 rounded-xl shadow-md transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                    >
                        {loading === 'yearly' ? 'Procesando...' : 'Obtener PRO Anual'}
                    </button>
                </div>

            </div>
        </div>
    )
}