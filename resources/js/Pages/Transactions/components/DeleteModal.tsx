
type DeleteModalProps = {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
}

export default function DeleteModal({ isOpen, onClose, onConfirm, title, message }: DeleteModalProps) {
    // Si no está abierto, no se renderiza nada
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div 
                className="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/50 transition-opacity" 
                onClick={onClose} 
            />

            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 border border-gray-100 dark:border-white/10 z-50">
                    
                    <div className="sm:flex sm:items-start">
                        {/* Icono de Alerta Rojo */}
                        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10 sm:mx-0 sm:size-10">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 text-red-600 dark:text-red-400">
                                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        
                        {/* Textos Informativos */}
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {message}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="mt-5 sm:mt-4 sm:flex justify-end gap-3">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-white/10 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm border border-gray-300 dark:border-transparent hover:bg-gray-50 dark:hover:bg-white/20 sm:mt-0 sm:w-auto focus:outline-none"
                        >
                            Cancelar
                        </button>

                        <button 
                            type="button" 
                            onClick={onConfirm}
                            className="inline-flex w-full justify-center rounded-md bg-red-600 dark:bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 dark:hover:bg-red-400 sm:w-auto focus:outline-none"
                        >
                            Eliminar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}