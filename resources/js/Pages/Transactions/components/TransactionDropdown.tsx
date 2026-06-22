// resources/js/Pages/components/TransactionDropdown.tsx

import { Transaction } from "@/types/transaction"
import { Link } from "@inertiajs/react"
import { useEffect, useRef } from "react"

type TransactionDropdownProps = {
    transaction: Transaction
    isOpen: boolean
    onToggle: () => void
    onDeleteIntent: () => void
}

export default function TransactionDropdown({ transaction, isOpen, onToggle, onDeleteIntent }: TransactionDropdownProps) {

    // referencia para saber cuál es el dropdown en el HTML
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Función que revisa dónde se hizo clic
        function handleClickOutside(event: MouseEvent) {
            // Si el menú está abierto
            //  el clic NO fue dentro del dropdown -> !dropdownRef.current.contains(event.target as Node)
            // dropdownRef.current si el menú existe
            if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onToggle()
            }
        }

        //Se escuchan los clickc en toda la página
        document.addEventListener("mousedown", handleClickOutside)

        // Limpiamos el evento cuando el componente se cierra/destruye
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen, onToggle])

    return (
        <div ref={dropdownRef} className="inline-block text-left relative">

            {/* Botón de tres puntitos con evento onClick de React */}
            <button
                type="button"
                onClick={onToggle}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors focus:outline-none relative z-30"
                >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
            </button>

            {/* el menu solo se renderiza si isOpen es true */}
            {isOpen && (
                <>
                    <div className="absolute right-0 top-full mt-1 w-44 rounded-xl bg-white dark:bg-gray-950 shadow-xl border border-gray-100 dark:border-gray-900 z-50 py-1 origin-top-right focus:outline-none animate-in fade-in slide-in-from-top-1 duration-100">

                        <Link
                            href={`/dashboard/transactions/${transaction.id}`}
                            className="group/item flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900/60 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-3 text-gray-400 group-hover/item:text-gray-600 dark:text-gray-500 dark:group-hover/item:text-gray-300 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Ver detalles
                        </Link>

                        <Link
                            href={`/dashboard/transactions/${transaction.id}/edit`}
                            className="group/item flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/60 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-3 text-gray-400 group-hover/item:text-gray-600 dark:text-gray-500 dark:group-hover/item:text-gray-300 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Editar
                        </Link>

                        <hr className="border-gray-100 dark:border-gray-900 my-1" />

                        <button
                            type="button"
                            onClick={() => onDeleteIntent()} //Se dispara la accion de eliminar mediante el componente de TableCard
                            className="group/item flex w-full items-center px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left font-medium"
                        >
                            <svg className="w-4 h-4 mr-3 text-red-400 group-hover/item:text-red-600 dark:text-red-500 dark:group-hover/item:text-red-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.895-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Eliminar
                        </button>

                    </div>
                </>
            )}
        </div>
    )
}