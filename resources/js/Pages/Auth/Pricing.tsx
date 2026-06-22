import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '../Transactions/components/Header';

export default function Pricing() {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased transition-colors duration-200">
            <Head title="Planes y Precios — Dedux" />

            <Header
                links={[{ label: 'Inicio', href: '/' }, { label: 'Características', href: '/features' }]}
            />

            <main className="max-w-5xl mx-auto px-6 pt-10 pb-24">
                <div className="text-center max-w-xl mx-auto mb-10">
                    <h1 className="text-4xl font-black text-gray-950 dark:text-white tracking-tight">
                        Planes transparentes, <br />escalabilidad simple.
                    </h1>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">
                        Elige el nivel de automatización que necesitas para gestionar tu contabilidad.
                    </p>
                </div>

                <div className="flex justify-center items-center mb-16">
                    <div className="bg-gray-100 dark:bg-gray-900 p-1 rounded-xl flex items-center gap-1 border border-gray-200/50 dark:border-gray-800">
                        <button
                            onClick={() => setBillingPeriod('monthly')}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${billingPeriod === 'monthly'
                                ? 'bg-white text-gray-950 dark:bg-gray-800 dark:text-white shadow-xs'
                                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                                }`}
                        >
                            Mensual
                        </button>
                        <button
                            onClick={() => setBillingPeriod('yearly')}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${billingPeriod === 'yearly'
                                ? 'bg-white text-gray-950 dark:bg-gray-800 dark:text-white shadow-xs'
                                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                                }`}
                        >
                            Anual
                            <span className="text-[9px] font-black tracking-normal normal-case px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                -20%
                            </span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">

                    <div className="rounded-2xl border border-gray-200 bg-white p-8 flex flex-col justify-between shadow-xs dark:border-gray-900 dark:bg-gray-950">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Esencial</span>
                            <h2 className="text-xl font-bold text-gray-950 dark:text-white tracking-tight mt-1">Plan Free</h2>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-4xl font-black text-gray-950 dark:text-white tracking-tight">$0</span>
                                <span className="text-xs font-medium text-gray-400">/ siempre gratis</span>
                            </div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
                                Ideal para profesionales independientes que prefieren procesar y organizar sus presupuestos de forma manual.
                            </p>

                            <ul className="mt-8 space-y-3 border-t border-gray-100 dark:border-gray-900 pt-6">
                                <li className="flex items-center gap-2.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white"></div>
                                    Hasta 15 cargas de XML al mes
                                </li>
                                <li className="flex items-center gap-2.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white"></div>
                                    Flujo de revisión <code className="text-[10px] bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded-sm">pending_review</code>
                                </li>
                                <li className="flex items-center gap-2.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white"></div>
                                    Gestión de presupuestos básicos
                                </li>
                                <li className="flex items-center gap-2.5 text-xs font-medium text-gray-400 line-through decoration-gray-300 dark:decoration-gray-800">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                                    Asistente de categorización con IA
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8">
                            <Link href="/register" className="w-full inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider text-gray-700 bg-gray-50 hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800 py-3.5 px-6 rounded-xl border border-gray-100 dark:border-gray-800 transition-all text-center">
                                Empezar gratis
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-gray-950 p-8 flex flex-col justify-between shadow-lg border border-transparent dark:bg-white relative overflow-hidden">
                        <span className="absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest bg-white/10 dark:bg-gray-950/5 text-white dark:text-gray-950 px-2 py-0.5 rounded-md">
                            Recomendado
                        </span>

                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 dark:text-cyan-600">Automatización Total</span>
                            <h2 className="text-xl font-bold text-white dark:text-gray-950 tracking-tight mt-1">Premium Pass</h2>

                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-4xl font-black text-white dark:text-gray-950 tracking-tight transition-all duration-300">
                                    {billingPeriod === 'monthly' ? '$99' : '$82.5'}
                                </span>
                                <span className="text-xs font-medium text-gray-500">
                                    {billingPeriod === 'monthly' ? '/ mes' : '/ mes (cobro anual)'}
                                </span>
                            </div>

                            <p className="text-xs font-medium text-gray-400 dark:text-gray-600 mt-4 leading-relaxed">
                                Para usuarios que requieren auditoría absoluta mediante Inteligencia Artificial y almacenamiento ilimitado.
                            </p>

                            <ul className="mt-8 space-y-3 border-t border-white/10 dark:border-gray-200 pt-6">

                                <li className="flex items-center gap-2.5 text-xs font-black text-cyan-400 dark:text-cyan-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 dark:bg-cyan-500"></div>
                                    Categorización y Auditoría con IA integrada
                                </li>
                                <li className="flex items-center gap-2.5 text-xs font-medium text-gray-300 dark:text-gray-700">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-gray-950"></div>
                                    Lectura de XML ilimitada
                                </li>
                                <li className="flex items-center gap-2.5 text-xs font-medium text-gray-300 dark:text-gray-700">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-gray-950"></div>
                                    Exportación limpia a Excel/PDF contable
                                </li>
                                <li className="flex items-center gap-2.5 text-xs font-medium text-gray-300 dark:text-gray-700">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-gray-950"></div>
                                    Resguardo e historial digital permanente
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8">
                            <Link href="/register" className="w-full inline-flex items-center justify-center font-black text-xs uppercase tracking-wider text-gray-950 bg-white hover:bg-gray-100 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-900 py-3.5 px-6 rounded-xl transition-all text-center shadow-xs">
                                Adquirir Premium
                            </Link>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}