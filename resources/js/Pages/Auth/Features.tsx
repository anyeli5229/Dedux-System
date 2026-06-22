import { Head, Link } from '@inertiajs/react';
import Header from '../Transactions/components/Header';

export default function Features() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased transition-colors duration-200">
            <Head title="Características — Dedux" />

            <Header
                links={[{ label: 'Inicio', href: '/' }, { label: 'Planes', href: '/pricing' }]}
            />

            <main className="max-w-4xl mx-auto px-6 pt-10 pb-24">
                <div className="mb-16">
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500 bg-cyan-500/10 px-2.5 py-1 rounded-md">
                        Arquitectura Funcional
                    </span>
                    <h1 className="text-4xl font-black text-gray-950 dark:text-white tracking-tight mt-4">
                        Todo lo que necesitas. <br />Nada que te distraiga.
                    </h1>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 max-w-xl">
                        Diseñamos herramientas precisas para resolver los dolores de cabeza de la administración fiscal y el control de presupuestos.
                    </p>
                </div>

                <div className="space-y-16">

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12 border-b border-gray-100 dark:border-gray-900">
                        <div className="md:col-span-4">
                            <h2 className="text-lg font-bold text-gray-950 dark:text-white tracking-tight">
                                Analizador Automatizado
                            </h2>
                            <span className="text-[10px] font-mono text-gray-400 block mt-1">LECTURA DE DATOS</span>
                        </div>
                        <div className="md:col-span-8">
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                Olvídate de transcribir información a mano. Nuestro analizador procesa la estructura interna de cualquier archivo XML nativo en milisegundos, abstrayendo con precisión milimétrica los importes, impuestos, fechas y datos fiscales del emisor de forma transparente.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12 border-b border-gray-100 dark:border-gray-900">
                        <div className="md:col-span-4">
                            <h2 className="text-lg font-bold text-gray-950 dark:text-white tracking-tight">
                                Flujo de Validación Pasiva
                            </h2>
                            <span className="text-[10px] font-mono text-cyan-500 block mt-1">ESTADO: REVISIÓN PENDIENTE</span>
                        </div>
                        <div className="md:col-span-8">
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                Para garantizar la integridad de tus estadísticas, los nuevos gastos ingresan bajo un estado de revisión pendiente. Esto te permite auditar visualmente los conceptos mapeados y dar el visto bueno antes de que impacten tus balances de presupuestos mensuales.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12">
                        <div className="md:col-span-4">
                            <h2 className="text-lg font-bold text-gray-950 dark:text-white tracking-tight">
                                Almacenamiento Integrado
                            </h2>
                            <span className="text-[10px] font-mono text-gray-400 block mt-1">RESGUARDO DIGITAL</span>
                        </div>
                        <div className="md:col-span-8">
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                Guardamos y asociamos de forma segura el archivo físico original a cada transacción. Mantén tu repositorio digital organizado, centralizado y listo para ser descargado en bloques limpios ante auditorías de contabilidad o requerimientos fiscales repentinos.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="mt-20 p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-900 text-center">
                    <h3 className="text-lg font-bold text-gray-950 dark:text-white">¿Listo para probar la diferencia?</h3>
                    <Link href="/auth/register" className="mt-4 inline-flex items-center justify-center font-black text-xs uppercase tracking-wider text-white bg-gray-950 hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 py-3 px-6 rounded-xl transition-all cursor-pointer">
                        Comenzar ahora
                    </Link>
                </div>
            </main>
        </div>
    )
}