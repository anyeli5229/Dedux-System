import { router } from "@inertiajs/react";
import { useState } from "react";

export default function SubscriptionUpgrade() {
    const [loading, setLoading] = useState(false);

const swapPlan = (newPlan: string) => {
    setLoading(true)
    router.post(`/subscription/swap/${newPlan}`, {}, {
        preserveScroll: true,
        onFinish: () => setLoading(false)
    })
}

    return (
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/2 p-6 mb-6 mt-3 dark:bg-cyan-500/1 dark:border-cyan-500/60">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 dark:text-cyan-400">
                            Ahorro disponible
                        </span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-950 dark:text-white tracking-tight">
                        Pásate al plan anual y ahorra
                    </h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 leading-relaxed max-w-xl">
                        Asegura un año completo por <strong className="text-gray-950 dark:text-white font-bold">$990/año</strong> en lugar de $1,188. <strong className="text-cyan-600 dark:text-cyan-400 font-bold">Te ahorras $198 al año</strong> — el equivalente a 2 meses gratis de Dedux PRO.
                    </p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium mt-3">
                        * Solo pagarás la diferencia proporcional por los días restantes de tu mes en curso.
                    </p>
                </div>

                <div className="shrink-0">
                    <button
                        onClick={() => swapPlan('yearly')}
                        disabled={loading}
                        className="w-full md:w-auto inline-flex items-center justify-center font-black text-xs uppercase tracking-wider text-white bg-cyan-500 hover:bg-cyan-600 dark:text-gray-950 dark:bg-cyan-400 dark:hover:bg-cyan-300 py-3.5 px-6 rounded-xl transition-all duration-200 cursor-pointer shadow-xs disabled:opacity-50"
                    >
                        {loading ? 'Procesando...' : 'Upgrade a Anual'}
                    </button>
                </div>
            </div>
        </div>
    )
}