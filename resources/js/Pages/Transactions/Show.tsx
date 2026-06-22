import { type Transaction } from "@/types/transaction";
import { Head, Link, useForm } from '@inertiajs/react';
import TransactionCard from './components/TransactionCard';
import AppLayout from '../Layouts/AppLayout';

interface Props {
  transaction: Transaction
}

export default function Show({ transaction }: Props) {
  const isIncome = transaction.type === 'income'
  const isPending = transaction.status === 'pending_review'

  const { patch, processing } = useForm()

  const handleApprove = () => {
    patch(`/transactions/${transaction.id}/approve`, {
      preserveScroll: true
    })
  }

  return (
    <AppLayout>
      <Head title={`Detalles - ${transaction.description}`} />

      <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased">
        {isPending && (
          <div className="mb-8 p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/60 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>

              <div>
                <h3 className="text-sm font-bold text-orange-900 dark:text-orange-400">Por revisar</h3>
                <p className="text-xs text-orange-700 dark:text-orange-500 mt-0.5 leading-relaxed">
                  Esta transacción fue procesada por la IA. Verifica que los montos, impuestos y datos fiscales sean correctos antes de aprobarla.
                </p>
              </div>
            </div>

            <button
              onClick={handleApprove}
              disabled={processing}
              className="sm:self-center px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap text-center"
            >
              {processing ? 'Aprobando...' : 'Aprobar Transacción'}
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8 w-full">
          <div className="flex-auto">
            <h1 className="font-bold text-4xl text-gray-900 dark:text-gray-50 tracking-tight">
              Detalles de transacción
            </h1>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
              Visualiza el desglose completo del movimiento, incluyendo el subtotal, impuestos calculados y el estado de la validación.
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

        <div className="mb-6 flex items-center justify-end gap-2">
          <span className="inline-flex px-3 py-1 rounded-lg text-xs font-semibold tracking-wider uppercase bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200/60 dark:border-gray-800">
            {transaction.currency}
          </span>
          <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold tracking-wide uppercase border ${isIncome
            ? 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/60'
            : 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-900/60'
            }`}>
            {isIncome ? 'Ingreso' : 'Gasto (Egreso)'}
          </span>
        </div>

        <TransactionCard
          transaction={transaction}
          isIncome={isIncome}
        />

      </div>
    </AppLayout>
  )
}