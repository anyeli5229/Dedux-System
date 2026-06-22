import { Subscription } from "@/types/subscription";
import { formatDate } from "@/utils";

type SubscriptionStatusProps = {
    isYearly: boolean
    color: string
    status_label: Subscription['status_label']
    price: Subscription['price']
}

export default function SubscriptionStatus({ isYearly, color, status_label, price }: SubscriptionStatusProps) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-500 dark:bg-gray-950">
            
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        Plan actual
                    </span>
                    <div className="flex items-center gap-3 mt-1.5">
                        <h2 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight">
                            DEDUX PRO
                        </h2>
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                            isYearly 
                                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' 
                                : 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                        }`}>
                            {isYearly ? 'Anual' : 'Mensual'}
                        </span>
                    </div>
                </div>

                <div className="sm:text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        Precio
                    </span>
                    <p className="text-3xl font-black text-gray-950 dark:text-white tracking-tight mt-1">
                        ${price} 
                        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 tracking-normal">
                            /{isYearly ? 'año' : 'mes'}
                        </span>
                    </p>
                </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-500 pt-5 mb-6">
                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                            {status_label.description}
                        </p>
                        <p className="text-sm font-bold text-gray-950 dark:text-white mt-0.5">
                            {formatDate(status_label.date)}
                        </p>
                    </div>
                    
                    <span className={`inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-semibold px-2.5 py-1 rounded-lg border ${color} dark:bg-gray-900/80 dark:border-gray-800`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse"></span>
                        {status_label.text}
                    </span>
                </div>
            </div>

        </div>
    )
}