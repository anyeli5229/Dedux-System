import { Transaction } from "@/types/transaction"
import { formatCategory, formatCurrency, formatDate } from "@/utils"
import { Link } from "@inertiajs/react"

type Props = {
    transaction: Transaction
    isIncome: boolean
}

export default function TransactionCard({ transaction, isIncome }: Props) {
    return (
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-500 rounded-2xl shadow-sm overflow-hidden transition-colors">

            <div className="p-8 sm:p-10 border-b border-gray-100 dark:border-gray-500 bg-gray-50/40 dark:bg-gray-900/20">
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {formatCategory(transaction.category)}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-950 dark:text-gray-50 tracking-tight mt-4">
                    {transaction.description}
                </h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Registrado el {formatDate(transaction.transaction_date)}
                </p>
            </div>

            <div className="p-8 sm:p-10 space-y-8">
                {(transaction.provider_name || transaction.provider_tax_id) && (
                    <div>
                        <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                            Información del Emisor / Proveedor
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-900/40 rounded-xl p-5 border border-gray-100 dark:border-gray-900">
                            {transaction.provider_name && (
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-gray-400 dark:text-gray-500">Razón Social o Nombre</span>
                                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{transaction.provider_name}</span>
                                </div>
                            )}
                            {transaction.provider_tax_id && (
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-gray-400 dark:text-gray-500">Identificación Fiscal (RFC / NIT)</span>
                                    <span className="text-sm font-mono font-medium text-gray-800 dark:text-gray-200 uppercase">{transaction.provider_tax_id}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <div>
                    <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                        Resumen financiero
                    </h2>

                    <div className="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-6 space-y-4 border border-gray-100 dark:border-gray-900">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>Subtotal</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                {formatCurrency(+transaction.subtotal)} <span className="text-xs text-gray-400">{transaction.currency}</span>
                            </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>Impuesto (IVA)</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                {formatCurrency(+transaction.tax)} <span className="text-xs text-gray-400">{transaction.currency}</span>
                            </span>
                        </div>
                        <hr className="border-gray-200/60 dark:border-gray-800 my-2" />
                        <div className="flex justify-between items-baseline">
                            <span className="text-base font-medium text-gray-900 dark:text-gray-100">Monto Total</span>
                            <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isIncome ? 'text-green-600 dark:text-green-400' : 'text-gray-950 dark:text-gray-50'}`}>
                                {isIncome ? '+' : ''} {formatCurrency(+transaction.total_amount)} <span className="text-sm font-normal text-gray-400 dark:text-gray-500">{transaction.currency}</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-900">
                    <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                        Comprobante Digital (XML / PDF)
                    </h2>

                    {transaction.attachment_path ? (
                        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 transition-colors group">
                            <div className="flex items-center space-x-3 min-w-0">
                                <div className="p-2 bg-gray-100 dark:bg-gray-900 rounded-lg text-gray-600 dark:text-gray-400 group-hover:bg-gray-950 dark:group-hover:bg-gray-50 group-hover:text-white dark:group-hover:text-gray-950 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="truncate">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                        {transaction.attachment_path.split('/').pop()}
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">Click para abrir o descargar comprobante</p>
                                </div>
                            </div>
                            <a href={`/storage/${transaction.attachment_path}`} target="_blank" rel="noreferrer"
                                className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-gray-50 underline pl-4 transition-colors">
                                Ver archivo
                            </a>
                        </div>
                    ) : (
                        <div className="text-center p-6 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/20 dark:bg-gray-900/10">
                            <p className="text-sm text-gray-400 dark:text-gray-500">No se adjuntó ningún comprobante XML o digital a esta transacción.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="px-8 py-5 bg-gray-50/50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-100/10 flex justify-end space-x-3">
                <Link href={`/dashboard/transactions/${transaction.id}/edit`}
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-200 dark:border-gray-800 text-sm font-semibold rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-400 dark:hover:border-gray-600 transition-all focus:outline-none cursor-pointer">
                    Editar detalles
                </Link>
            </div>

        </div>
    )
}