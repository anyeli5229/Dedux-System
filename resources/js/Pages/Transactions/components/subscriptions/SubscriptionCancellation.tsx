import { router } from "@inertiajs/react";
import { useState } from "react";
import { formatDate } from "@/utils";
import { Subscription } from "@/types/subscription";

type SubscriptionCancellationProps = {
    next_billing_date: Subscription['next_billing_date']
}

export default function SubscriptionCancellation({ next_billing_date }: SubscriptionCancellationProps) {
    const [loading, setLoading] = useState(false)
    const [confirmCancel, setConfirmCancel] = useState(false)

    const cancelSubscription = () => {
        setLoading(true)
        router.post('/subscription/cancel', {}, {
            preserveScroll: true,
            onFinish: () => setLoading(false)
        })
    }

    return (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/1 p-6 dark:border-red-500/60 dark:bg-transparent">
            <h3 className="text-xl font-black text-gray-950 dark:text-white tracking-tight mb-1">
                Cancelar Suscripción
            </h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mb-6">
                Mantendrás acceso al Asistente AI hasta el final del periodo pagado el <strong className="text-gray-950 dark:text-gray-200 font-bold">{formatDate(next_billing_date)}</strong>. Después de esta fecha, tu cuenta pasará al plan gratuito automáticamente sin cargos adicionales.
            </p>

            {!confirmCancel ? (
                <button
                    onClick={() => setConfirmCancel(true)}
                    className="inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider text-red-600 bg-red-500/5 hover:bg-red-500/10 dark:text-red-400 dark:bg-red-500/3 dark:hover:bg-red-500/8 py-3 px-5 rounded-xl transition-all duration-200 cursor-pointer border border-red-500/10"
                >
                    Cancelar mi suscripción
                </button>
            ) : (
                <div className="rounded-xl border border-red-500/60 bg-white p-4 dark:bg-gray-950 max-w-md animate-fade-in">
                    <p className="text-sm font-bold text-gray-950 dark:text-white mb-3">
                        ¿Estás completamente seguro de proceder?
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={cancelSubscription}
                            disabled={loading}
                            className="inline-flex items-center justify-center font-black text-xs uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 py-2.5 px-4 rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50"
                        >
                            {loading ? 'Cancelando...' : 'Sí, cancelar'}
                        </button>
                        <button
                            onClick={() => setConfirmCancel(false)}
                            disabled={loading}
                            className="inline-flex items-center justify-center font-black text-xs uppercase tracking-wider text-gray-600 bg-gray-50 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-800 py-2.5 px-4 rounded-lg transition-all duration-200 cursor-pointer border border-gray-100 dark:border-gray-800"
                        >
                            No, mantener
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}