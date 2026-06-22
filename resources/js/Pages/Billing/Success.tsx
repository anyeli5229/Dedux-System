import { Head, Link } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";

export default function Success() {
    return (
        <AppLayout title="¡Bienvenido a Pro!">
            <Head title="Pago exitoso" />

            <div className="max-w-xl mx-auto my-12 px-4">
                <div className="rounded-2xl border-2 border-gray-950 bg-white p-8 text-center shadow-md dark:border-white dark:bg-gray-950 relative overflow-hidden">
                    

                    <div className="absolute -top-12 -left-12 w-24 h-24 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none"></div>

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-cyan-500 to-blue-600 text-white shadow-sm mb-6">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>

   
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black tracking-widest text-white bg-linear-to-r from-cyan-500 to-blue-600 uppercase mb-3 shadow-xs">
                        ⚡ Miembro DEDUX PRO
                    </span>

                    <h2 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight mt-1">
                        ¡Tu pago fue exitoso!
                    </h2>
                    <p className="mt-3 text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                        ¡Gracias por tu confianza! Tu cuenta ha sido actualizada con éxito. El asistente de Inteligencia Artificial y el escáner de tickets ya se encuentran completamente desbloqueados.
                    </p>

                    <div className="mt-8 border-t border-gray-100 dark:border-gray-900 pt-6">
                        <Link 
                            href="/dashboard" 
                            className="w-full inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider text-white bg-gray-950 hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 py-3.5 px-6 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
                        >
                            Comenzar a explorar funciones PRO
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}