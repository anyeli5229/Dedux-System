import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'react-toastify';

export default function TicketScanner() {
    const [document, setDocument] = useState<File | null>(null)
    const [isScanning, setIsScanning] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isLimitReached, setIsLimitReached] = useState(false) // Estado que verifica el límite de uso de la IA

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setDocument(e.target.files[0])
            setErrorMessage(null)
        }
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!document) return

        setIsScanning(true)
        setErrorMessage(null)
        const formData = new FormData()
        formData.append('document', document)

        try {
            const response = await fetch('/transactions/scan-ticket', {
                method: 'POST',
                body: formData,
                headers: { 'X-Requested-With': 'XMLHttpRequest' }
            })

            const result = await response.json()

            if (!response.ok) {
                if (response.status === 403 && result.requires_subscription) {
                    setIsLimitReached(true)
                    setIsScanning(false)
                    return
                }
                throw new Error(result.message || 'Error en el servidor')
            }

            if (result.success && result.redirect_url) {
                toast.success('Transacción registrada correctamente, redirigiendo para la revisión')
                router.visit(result.redirect_url)
            }

        } catch (error: any) {
            setErrorMessage(error.message || 'Ocurrió un error inesperado al escanear.')
            setIsScanning(false)
        }
    }

    return (
        <div className="w-full mx-auto p-6">
            {!isLimitReached ? (
                <div className="bg-white dark:bg-gray-950 p-8 rounded-2xl border border-gray-100 dark:border-gray-500 shadow-xs transition-colors">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Escáner Automático de Documentos</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sube una imagen, un XML o PDF. La IA extraerá los montos y creará el registro al instante.</p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center bg-gray-50/50 dark:bg-gray-900/20 hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors relative">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*,.pdf,.xml"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                disabled={isScanning}
                            />
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {document ? `Archivo: ${document.name}` : 'Arrastra tu documento aquí o haz clic para buscar'}
                            </p>
                        </div>

                        {errorMessage && <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl">{errorMessage}</div>}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={!document || isScanning}
                                className="px-6 py-2.5 font-bold rounded-xl text-sm transition-all duration-200 shadow-xs flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-gray-800 dark:disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
                            >
                                {isScanning ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        Procesando...
                                    </>
                                ) : (
                                    'Escanear Documento'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                /* 🔒 RENDERIZADO CUANDO LLEGA AL LÍMITE: Un banner elegante que invita a bajar a los planes */
                <div className="bg-gray-50 dark:bg-gray-900/30 border border-dashed border-amber-300 dark:border-amber-900/50 p-8 rounded-2xl text-center flex flex-col items-center justify-center py-12 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center mb-4 border border-amber-200 dark:border-amber-900/30 text-amber-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0-6v2m0-5h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
                        </svg>
                    </div>
                    <span className="px-3 py-1 text-[10px] uppercase font-extrabold tracking-wider text-amber-700 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-400 rounded-full">
                        Pruebas de demostración agotadas
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-3 tracking-tight">
                        Llegaste al límite de escaneos gratuitos
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 max-w-sm leading-relaxed">
                        Has utilizado tus 5 procesamientos de tickets de demostración. Para seguir subiendo documentos de forma ilimitada, adquiere una suscripción pro.
                    </p>
                    <button
                        onClick={() => window.scrollTo({
                            top: window.document.body.scrollHeight,
                            behavior: 'smooth'
                        })}
                        className="mt-5 px-5 py-2 font-bold bg-amber-600 text-white rounded-xl text-xs uppercase tracking-wider hover:bg-amber-500 transition-colors shadow-xs"
                    >
                        Ver Planes de Suscripción ↓
                    </button>
                </div>
            )}
        </div>
    )
}