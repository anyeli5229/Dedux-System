import { Subscription } from "@/types/subscription";
import { formatDate } from "@/utils";

type SubscriptionDowngradeProps = {
    next_billing_date: Subscription['next_billing_date']
    ends_at?: Subscription['ends_at']
}

export default function SubscriptionDowngrade({ next_billing_date, ends_at }: SubscriptionDowngradeProps) {
    return (
        <div className="rounded-2xl border-l-4 border-l-gray-400 border border-gray-100 bg-gray-50/50 p-6 mb-6 mt-3 dark:border-gray-500 dark:border-l-gray-600 dark:bg-gray-950">
            <h3 className="text-xl font-black text-gray-950 dark:text-white tracking-tight mb-1">
                Estás en el plan Anual
            </h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
                Si deseas cambiar al esquema mensual, puedes cancelar tu suscripción actual. Mantendrás acceso premium completo hasta el <strong className="text-gray-900 dark:text-gray-200 font-bold">{formatDate(ends_at || next_billing_date)}</strong>. Posterior a esa fecha, podrás contratar el plan mensual cuando lo desees.
            </p>
        </div>
    )
}