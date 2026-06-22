import { router } from "@inertiajs/react";
import { useState } from "react";
import { formatDate } from "@/utils";
import { Subscription } from "@/types/subscription";

type SubscriptionResumeProps = {
    ends_at: Subscription['ends_at']
}

export default function SubscriptionResume({ ends_at }: SubscriptionResumeProps) {
    const [loading, setLoading] = useState(false)

    const resumeSubscription = () => {
        setLoading(true);
        router.post('/subscription/resume', {}, {
            preserveScroll: true,
            onFinish: () => setLoading(false)
        })
    }

    return (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/2 p-6 mb-6 mt-3 dark:bg-emerald-500/1 dark:border-emerald-500/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                            Acceso Premium garantizado
                        </span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-950 dark:text-white tracking-tight">
                        ¿Cambiaste de opinión?
                    </h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 leading-relaxed max-w-xl">
                        Estás a un clic de mantener todos tus beneficios activos. Reactiva tu suscripción antes del <strong className="text-gray-950 dark:text-white font-bold">{formatDate(ends_at)}</strong> para continuar disfrutando del Asistente AI sin interrupciones y sin cargos adicionales.
                    </p>
                </div>

                <div className="shrink-0">
                    <button
                        onClick={resumeSubscription}
                        disabled={loading}
                        className="w-full md:w-auto inline-flex items-center justify-center font-black text-xs uppercase tracking-wider text-white bg-gray-950 hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 py-3.5 px-6 rounded-xl transition-all duration-200 cursor-pointer shadow-xs disabled:opacity-50"
                    >
                        {loading ? 'Procesando...' : 'Reactivar suscripción'}
                    </button>
                </div>
            </div>
        </div>
    );
}