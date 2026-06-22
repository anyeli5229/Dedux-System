import React from 'react'
import AppLayout from '../Layouts/AppLayout'
import { Head, Link, useForm } from '@inertiajs/react' // 🌟 Importamos useForm
import TransactionForm from './components/TransactionForm'
import { Transaction, TransactionFieldsForm } from '@/types/transaction'

type Props = {
    transaction: Transaction
}

export default function Edit({ transaction }: Props) {

    const { data, setData, put, processing, errors } = useForm<TransactionFieldsForm>({
        description: transaction.description,
        provider_name: transaction.provider_name ?? '',
        provider_tax_id: transaction.provider_tax_id ?? '',
        currency: transaction.currency,
        subtotal: transaction.subtotal,
        tax: transaction.tax,
        total_amount: transaction.total_amount,
        type: transaction.type,
        category: transaction.category,
        transaction_date: transaction.transaction_date
            ? new Date(transaction.transaction_date).toISOString().split('T')[0]
            : ''
    })


    const handleSubmit = (e: React.FormEvent) => { // 🌟 Corregido a FormEvent para consistencia con TypeScript
        e.preventDefault()

        put(`/dashboard/transactions/${transaction.id}`, {
            preserveScroll: true,
        })
    }

    return (
        <AppLayout>
            <Head title={`Editar Transacción - ${transaction.description}`} />

            <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased">

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8 w-full">
                    <div className="flex-auto">
                        <h1 className="font-bold text-4xl text-gray-900 dark:text-gray-50 tracking-tight">
                            Editar transacción
                        </h1>
                        <p className="mt-2 text-base text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
                            Modifica los detalles del movimiento. Al guardar, los balances e impuestos se recalcularán automáticamente.
                        </p>
                    </div>

                    <div>
                        <Link
                            href='/dashboard'
                            className="inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider text-gray-600 bg-gray-50 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-800 py-2.5 px-4 rounded-xl border border-gray-100 dark:border-gray-800 transition-all duration-200 cursor-pointer"
                        >
                            Volver
                        </Link>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-500 rounded-2xl p-8 sm:p-10 shadow-sm max-w-4xl mx-auto transition-colors">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <TransactionForm
                            data={data}
                            setData={setData}
                            errors={errors}
                        />

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-gray-950 hover:bg-gray-900 dark:hover:bg-gray-950 dark:hover:text-white  dark:bg-white dark:text-gray-950 dark:hover:border-white border disabled:bg-gray-400 w-full p-3.5 rounded-xl text-white font-semibold text-base cursor-pointer transition-all mt-6 shadow-sm tracking-wide text-center"
                        >
                            {processing ? 'Guardando cambios...' : 'Guardar Cambios'}
                        </button>
                    </form>
                </div>

            </div>
        </AppLayout>
    )
}