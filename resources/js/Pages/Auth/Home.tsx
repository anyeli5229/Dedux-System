import { Head, Link } from '@inertiajs/react';
import Header from '../Transactions/components/Header';
import Footer from '../Transactions/components/Footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased selection:bg-cyan-500/10 selection:text-cyan-500 transition-colors duration-200">
            <Head title="Dedux — Facturación y Auditoría AI Minimalista" />

            <Header 
                links={[{ label: 'Características', href: '/features' }, { label: 'Planes', href: '/pricing' }]}
            />

            <section className="relative pt-10 pb-20 overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 mb-6 animate-fade-in">
                        Gestión inteligente de XML
                    </span>

                    <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-gray-950 dark:text-white leading-[1.05] mb-6">
                        Tus facturas bajo control, <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-950 via-gray-600 to-gray-400 dark:from-white dark:via-gray-300 dark:to-gray-600">
                            sin el dolor de cabeza.
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg font-medium text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
                        Arrastra tus archivos XML, valida tus presupuestos y deja que nuestro sistema organice tu contabilidad fiscal de forma automatizada y elegante.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/auth/register"
                            className="w-full sm:w-auto inline-flex items-center justify-center font-black text-xs uppercase tracking-wider text-white bg-gray-950 hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 py-4 px-8 rounded-xl transition-all duration-200 shadow-md cursor-pointer"
                        >
                            Empezar Gratis
                        </Link>
                        <a
                            href="#features"
                            className="w-full sm:w-auto inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider text-gray-600 bg-gray-50 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-800 py-4 px-8 rounded-xl border border-gray-100 dark:border-gray-800 transition-all duration-200 cursor-pointer"
                        >
                            Ver Características
                        </a>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-6 mt-16 animate-fade-in-up">
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950 p-3 shadow-2xl backdrop-blur-xs">
                        <div className="rounded-xl border border-gray-200/60 dark:border-gray-800/80 bg-white dark:bg-gray-900 h-64 sm:h-100 w-full p-4 flex flex-col gap-4 overflow-hidden relative">
                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                                </div>
                                <div className="h-4 w-32 bg-gray-100 dark:bg-gray-800 rounded-md"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-24 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex flex-col justify-between">
                                    <div className="h-3 w-12 bg-gray-200 dark:bg-gray-800 rounded-xs"></div>
                                    <div className="h-5 w-20 bg-gray-950 dark:bg-white rounded-xs"></div>
                                </div>
                                <div className="h-24 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex flex-col justify-between">
                                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded-xs"></div>
                                    <div className="h-5 w-16 bg-gray-400 dark:bg-gray-700 rounded-xs"></div>
                                </div>
                                <div className="h-24 bg-emerald-500/2 border border-emerald-500/20 rounded-xl p-3 flex flex-col justify-between">
                                    <div className="px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-max">Validada</div>
                                    <div className="h-5 w-24 bg-gray-950 dark:bg-white rounded-xs"></div>
                                </div>
                            </div>
                            <div className="space-y-2 mt-2">
                                <div className="h-10 border border-gray-100 dark:border-gray-800 rounded-xl flex items-center justify-between px-4">
                                    <div className="h-3 w-32 bg-gray-200 dark:bg-gray-800 rounded-xs"></div>
                                    <div className="h-3 w-12 bg-gray-300 dark:bg-gray-700 rounded-xs"></div>
                                </div>
                                <div className="h-10 border border-gray-100 dark:border-gray-800 rounded-xl flex items-center justify-between px-4">
                                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded-xs"></div>
                                    <div className="h-3 w-12 bg-gray-300 dark:bg-gray-700 rounded-xs"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="py-24 border-t border-gray-100 dark:border-gray-900 bg-gray-50/3 dark:bg-transparent">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center max-w-xl mx-auto mb-16">
                        <h2 className="text-3xl font-black tracking-tight text-gray-950 dark:text-white">
                            Diseñado para la precisión financiera
                        </h2>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">
                            Menos clicks, más claridad. Un sistema pensado para automatizar tu flujo contable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-900 dark:bg-gray-950">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center mb-4 font-bold text-gray-950 dark:text-white text-xs">01</div>
                            <h3 className="text-base font-bold text-gray-950 dark:text-white tracking-tight mb-2">Lectura Directa de XML</h3>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                                Sube tus comprobantes fiscales nativos. Nuestro analizador inteligente extrae emisores, subtotales e impuestos en tiempo récord sin errores.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-900 dark:bg-gray-950">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center mb-4 font-bold text-gray-950 dark:text-white text-xs">02</div>
                            <h3 className="text-base font-bold text-gray-950 dark:text-white tracking-tight mb-2">Flujo Pending Review</h3>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                                Mantén el control. Tus transacciones entran a revisión para que las valides antes de que impacten tus balances y reportes finales.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-900 dark:bg-gray-950">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center mb-4 font-bold text-gray-950 dark:text-white text-xs">03</div>
                            <h3 className="text-base font-bold text-gray-950 dark:text-white tracking-tight mb-2">Resguardo Digital Seguro</h3>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                                Almacenamos de manera organizada los archivos XML originales. Descarga tus comprobantes fiscales en cualquier momento listos para auditorías o revisiones contables.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 border-t border-gray-100 dark:border-gray-900">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-950 dark:text-white mb-4">
                        Optimiza tus cuentas hoy mismo
                    </h2>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-xs mx-auto mb-8">
                        Únete a Dedux y experimenta la verdadera tranquilidad contable.
                    </p>
                    <Link
                        href="/auth/register"
                        className="inline-flex items-center justify-center font-black text-xs uppercase tracking-wider text-white bg-gray-950 hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 py-4 px-8 rounded-xl transition-all duration-200 shadow-md cursor-pointer"
                    >
                        Crear mi cuenta gratuita
                    </Link>
                </div>
            </section>

            <Footer/>
        </div>
    )
}