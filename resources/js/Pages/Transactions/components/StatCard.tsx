import { formatCurrency } from "@/utils"
import { Link } from "@inertiajs/react"

type CardProps = {
    title: string
    subtitle: string
    value: string | number
    color?: string
    subColor?: string
    href?: string
}

export function Card({ title, subtitle, value, color = "text-gray-900 dark:text-white", subColor = "text-gray-400 dark:text-gray-500", href }: CardProps) {
    const CardContent = (
        <>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">{title}</p>
            <h3 className={`text-3xl font-black mt-2 tracking-tight ${color}`}>{value}</h3>
            <p className={`text-xs font-medium mt-1 ${subColor}`}>{subtitle}</p>
        </>
    )

    const baseClasses = "block bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/30 dark:shadow-none transition-all duration-200"

    if (href) {
        return (
            <Link
                href={href}
                className={`${baseClasses} hover:shadow-2xl hover:-translate-y-0.5 hover:border-gray-200 dark:hover:border-gray-700 cursor-pointer`}
            >
                {CardContent}
            </Link>
        )
    }

    return (
        <div className={baseClasses}>
            {CardContent}
        </div>
    )
}

//**************************************************************

type StatCardProps = {
    totalExpense: string
    totalIncome: string
    pendingIaCount: string | number
}

export default function StatCard({ totalExpense, totalIncome, pendingIaCount }: StatCardProps) {
    const hasPending = +pendingIaCount > 0

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            
            <Card
                title="Gastos Deducibles"
                subtitle="Monto total de egresos registrados"
                value={formatCurrency(+totalExpense)}
                href="/dashboard?type=expense"
            />

            <Card
                title="Ingresos del Mes"
                subtitle="Entradas totales verificadas"
                value={formatCurrency(+totalIncome)}
                color="text-green-600 dark:text-green-400"
                subColor="text-green-700 dark:text-green-500/80"
                href="/dashboard?type=income"
            />

            <Card
                title="Facturas por Revisar"
                subtitle={hasPending ? "Tienes lecturas esperando aprobación" : "Lecturas pendientes de aprobación"}
                value={pendingIaCount}
                color={hasPending ? 'text-amber-600 dark:text-amber-400' : 'text-gray-900 dark:text-white'}
                subColor={hasPending ? 'text-amber-700 dark:text-amber-500/80' : 'text-gray-400 dark:text-gray-500'}
                href="/dashboard?status=pending_review"
            />
        </div>
    )
}