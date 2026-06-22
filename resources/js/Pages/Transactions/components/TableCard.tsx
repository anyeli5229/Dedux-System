import { Transaction } from "@/types/transaction"
import { formatCategory, formatCurrency, formatDate } from "@/utils"
import { Link, router } from "@inertiajs/react"
import TransactionDropdown from "./TransactionDropdown"
import { useState } from "react"
import DeleteModal from "./DeleteModal"

type TableCardProps = {
    transactions: Transaction[]
}

export default function TableCard({ transactions }: TableCardProps) {

    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)

    // Estado para controlar qué transacción se planea eliminar
    const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null)

    //Función que dispara la petición DELETE real hacia Laravel via Inertia
    const handleDeleteConfirm = () => {
        if (!transactionToDelete) return

        router.delete(`/dashboard/transactions/${transactionToDelete.id}`, {
            onSuccess: () => {
                setTransactionToDelete(null) // Cerrar modal
                setOpenDropdownId(null)// Cerramos el dropdown 
            },
            preserveScroll: true // Evita que la página salte hacia arriba al eliminar
        })
    }

    return (
        <div className="w-full bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-500 shadow-xs">
            <div className="w-full overflow-x-auto scrollbar-thin">
                <table className="w-full text-center border-collapse min-w-200 mb-32">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-500 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                            <th className="py-4 px-6">Fecha</th>
                            <th className="py-4 px-6">Descripción</th>
                            <th className="py-4 px-6">Categoría</th>
                            <th className="py-4 px-6">Subtotal</th>
                            <th className="py-4 px-6">IVA / Tax</th>
                            <th className="py-4 px-6">Monto Total</th>
                            <th className="py-4 px-6 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300 text-sm">
                        {transactions.map(transaction => (
                            <tr key={transaction.id}
                                className={`relative transition-colors duration-200 ${openDropdownId === transaction.id ? 'z-40' : 'z-10'} 
                                ${transaction.status === 'pending_review'
                                        ? 'bg-amber-50/40 hover:bg-amber-50/70 dark:bg-amber-500/2 dark:hover:bg-amber-500/5'
                                        : 'hover:bg-gray-50/80 dark:hover:bg-gray-900/90'}`}
                            >
                                <td className="py-4 px-6 whitespace-nowrap text-gray-500 dark:text-gray-300">
                                    {formatDate(transaction.transaction_date)}
                                </td>
                                <td className="py-4 px-6 font-medium text-gray-900 dark:text-white position-static">
                                    <Link href={`/dashboard/transactions/${transaction.id}`} className="after:absolute after:inset-0 after:z-10 block focus:outline-none">
                                        {transaction.description}
                                        {transaction.status === 'pending_review' && (
                                            <div>
                                                <span className="ml-1 mt-2 text-[10px] font-bold text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-500/10 px-1.5 py-0.5 rounded-md inline-block">
                                                    Revisar
                                                </span>
                                            </div>
                                        )}
                                    </Link>
                                </td>

                                <td className="py-4 px-6 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800">
                                        {formatCategory(transaction.category)}
                                    </span>
                                </td>

                                <td className="py-4 px-6 whitespace-nowrap text-gray-500 dark:text-gray-300">
                                    {formatCurrency(+transaction.subtotal)}
                                </td>

                                <td className="py-4 px-6 whitespace-nowrap text-gray-500 dark:text-gray-300">
                                    {formatCurrency(+transaction.tax)}
                                </td>

                                <td className="py-4 px-6 whitespace-nowrap font-bold text-base">
                                    <span className={transaction.type === 'income' ? "text-green-600 dark:text-emerald-400" : "text-gray-900 dark:text-white"}>
                                        {formatCurrency(+transaction.total_amount)}
                                    </span>
                                </td>

                                <td className="py-4 px-6 text-right whitespace-nowrap relative z-30">
                                    <TransactionDropdown
                                        transaction={transaction}
                                        isOpen={openDropdownId === transaction.id}
                                        onToggle={() => setOpenDropdownId(openDropdownId === transaction.id ? null : transaction.id)}
                                        onDeleteIntent={() => setTransactionToDelete(transaction)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <DeleteModal
                isOpen={transactionToDelete !== null}
                onClose={() => setTransactionToDelete(null)}
                onConfirm={handleDeleteConfirm}
                title="Eliminar Transacción"
                message={`¿Deseas eliminar la transacción "${transactionToDelete?.description}"? Esta acción no se puede deshacer.`}
            />
        </div>
    )
}
