import { Head, Link, usePage } from '@inertiajs/react';
import StatCard from './components/StatCard';
import AppLayout from '../Layouts/AppLayout';
import ChartCard from './components/ChartCard';
import AnalysisCard from './components/AnalysisCard';
import TableCard from './components/TableCard';
import { Transaction } from '@/types/transaction';
import DeduxAgent from './components/DeduxAgent';
import PricingTable from './components/PricingTable';
import TicketScanner from './components/TicketScanner';

type DashboardProps = {
    transactions: Transaction[]
    totalIncome: string
    totalExpense: string
    pendingIaCount: string
    chartData: Record<string, number>
}

export default function Dashboard({ transactions, totalIncome, totalExpense, pendingIaCount, chartData }: DashboardProps) {

    const noHayGrafica = Object.keys(chartData ?? {}).length === 0
    const noHayTransacciones = (transactions ?? []).length === 0

    const { auth } = usePage().props

    return (
        <AppLayout
            title="Panel de administración"
            actions={
                <>
                    <Link
                        href="/dashboard/transactions/create"
                        className="inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider text-gray-700 bg-white border border-gray-200 hover:border-gray-900 py-3 px-5 rounded-xl shadow-xs transition-all duration-200 dark:bg-gray-950 dark:text-white dark:border-gray-500 dark:hover:border-gray-100"
                    >
                        Registrar Transacción
                    </Link>
                </>
            }
        >
            <Head title="Panel de Control" />

            <StatCard
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                pendingIaCount={pendingIaCount}
            />

            <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-500 shadow-xs overflow-hidden transition-colors">

                <div className="p-6 border-b border-gray-50 dark:border-gray-900 flex items-center justify-between">
                    <h2 className="font-bold text-gray-900 dark:text-white tracking-tight">Últimos Movimientos</h2>

                    {/* Si la URL tiene algún parámetro de filtro, mostramos el estado y la opción de limpiarlo */}
                    {(new URLSearchParams(window.location.search).get('status') || new URLSearchParams(window.location.search).get('type')) && (
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-900/40">
                                {new URLSearchParams(window.location.search).get('status') === 'pending_review'
                                    ? 'Mostrando pendientes de la IA'
                                    : 'Filtrando listado'}
                            </span>

                            {/* Enlace de Inertia que limpia los query params y regresa al estado inicial */}
                            <Link
                                href="/dashboard"
                                className="text-xs font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors underline decoration-dotted"
                            >
                                Ver todas ×
                            </Link>
                        </div>
                    )}
                </div>

                {noHayTransacciones ? (
                    <div className="p-6 text-center max-w-sm mx-auto py-12">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-500 text-gray-400 dark:text-gray-500">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
                            </svg>
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">No se encontraron movimientos</h4>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1 leading-relaxed">
                            No hay transacciones registradas bajo este criterio de búsqueda.
                        </p>
                    </div>
                ) : (
                    <TableCard transactions={transactions} />
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                {noHayGrafica ? (
                    <div className="md:col-span-3 bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-500 shadow-xs flex flex-col justify-between min-h-85 transition-colors">
                        <div className='p-6'>
                            <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">Gastos por categoría</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Distribución de egresos del mes</p>
                        </div>

                        <div className="flex flex-col items-center justify-center flex-1 py-10 text-center">
                            <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center mb-3 border border-gray-100/50 dark:border-gray-500">
                                <svg className="w-6 h-6 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">No hay análisis disponible</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs mt-1 leading-relaxed">
                                Las gráficas se calculan a partir de tus gastos verificados y consolidados.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <ChartCard chartData={chartData} />
                        <AnalysisCard chartData={chartData} totalExpense={+totalExpense} />
                    </>
                )}
            </div>

            <TicketScanner/>

            <DeduxAgent transactions={transactions} />

            {!auth.user?.subscribed && (
                <div className="mt-10 border-t border-gray-50 dark:border-gray-500 pt-10">
                    <PricingTable />
                </div>
            )}
        </AppLayout>
    )
}