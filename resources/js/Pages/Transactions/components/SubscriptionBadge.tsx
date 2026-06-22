import { Link } from "@inertiajs/react"

type SubscriptionBadgeProps = {
    plan: 'monthly' | 'yearly' | null
}

export default function SubscriptionBadge({ plan }: SubscriptionBadgeProps) {
    return (
        <>
            {plan === 'yearly' && (
                <span className="border border-amber-500/40 text-amber-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-amber-500/10 shadow-xs">
                    PRO Anual
                </span>
            )}

            {plan === 'monthly' && (
                <span className="border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-cyan-500/10 shadow-sm">
                    PRO Mensual
                </span>
            )}

            {plan === null && (
                <Link
                    href="/plans"
                    className="border border-dashed border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg transition-colors duration-200"
                >
                    Suscribirse a PRO
                </Link>
            )}
        </>
    )
}
