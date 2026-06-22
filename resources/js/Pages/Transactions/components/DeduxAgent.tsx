import { Transaction } from '@/types/transaction';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';
import React, { useState } from 'react';

type Props = {
    transactions: Transaction[]
}

export default function DeduxAgent({ transactions }: Props) {
    const { auth } = usePage().props
    const userName = auth?.user?.name || 'Usuario'

    const [input, setInput] = useState('')

    // 🌟 Eliminamos el useState manual de 'input' y dejamos que useChat controle el chat de forma nativa
    const { sendMessage, messages, status } = useChat({
        transport: new DefaultChatTransport({
            api: '/transactions/chat'
        }),
        onFinish: ({ message }) => {
            try {
                const textPart = message.parts.find((part): part is { type: 'text'; text: string } => part.type === 'text' && typeof (part as any).text === 'string')

                if (textPart && textPart.text.includes('<data>')) {
                    // expresión regular para extraer solo lo que está dentro de <data>...</data>
                    const match = textPart.text.match(/<data>([\s\S]*?)<\/data>/)

                    if (match && match[1]) {
                        const data = JSON.parse(match[1].trim())

                        if (data.action === 'CREATE_TRANSACTION') {
                            router.post('/dashboard/transactions', {
                                description: data.description,
                                total_amount: data.total_amount,
                                type: data.type,
                                category: data.category,
                                tax: data.tax,
                                subtotal: data.subtotal,
                                currency: data.currency ?? 'MXN',
                                transaction_date: new Date().toISOString().split('T')[0],
                                provider_name: data.provider_name ?? null,
                                provider_tax_id: data.provider_tax_id ?? null
                            }, {
                                preserveScroll: true,
                                preserveState: true,
                                onSuccess: () => {
                                    toast.success(`¡${data.description} registrado con éxito por $${data.total_amount}!`, {
                                        className: 'bg-slate-900 text-slate-100 rounded-xl border border-slate-800 shadow-xl',
                                        progressClassName: 'bg-cyan-600',
                                    })
                                    setInput('') // Limpiamos el input al tener éxito
                                },
                                onError: () => {
                                    toast.error("Hubo un problema al guardar la transacción.")
                                }
                            })
                        }
                    }
                }
            } catch (error) {
                console.error("Error procesando el bloque de datos oculto:", error)
            }
        }
    })

    const isLoading = status === 'streaming' || status === 'submitted'

    return (
        <section className="p-6 bg-white border border-gray-100 rounded-2xl shadow-xs mt-10 dark:bg-gray-950 dark:border-gray-500">
            <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gray-950 text-white dark:bg-white dark:text-gray-950">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h3 className="text-sm font-bold tracking-tight text-gray-950 dark:text-white uppercase">
                    Asistente Dedux AI
                </h3>
            </div>

            <h2 className="text-xl lg:text-2xl font-black tracking-tight text-gray-950 dark:text-white max-w-2xl leading-tight">
                Pregunta sobre tus movimientos, analiza métricas o agrega gastos al instante.
            </h2>

            <div className="space-y-4 empty:hidden mb-6 mt-6 overflow-y-auto max-h-125 pr-2 scrollbar-thin">
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-900/60 empty:hidden transition-colors">
                    {messages.map((message) => {
                        const isUser = message.role === 'user'
                        return (
                            <div key={message.id} className="space-y-2">
                                {message.parts.map((part, index) => {
                                    if (part.type !== 'text') return null

                                    const rawText = part.text || ''
                                    if (!rawText.trim()) return null

                                    return (
                                        <div
                                            key={`${message.id}-part-${index}`}
                                            className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-fade-in`}
                                        >
                                            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-1 px-1 uppercase tracking-wider">
                                                {isUser ? userName : 'Dedux AI'}
                                            </span>

                                            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-xs leading-relaxed transition-colors ${isUser
                                                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-950 rounded-br-none font-medium'
                                                : 'bg-slate-800 text-slate-100 dark:bg-gray-900 border border-slate-700/50 dark:border-gray-800 rounded-bl-none'
                                                }`}>
                                                <div className="whitespace-pre-line">
                                                    {isUser
                                                        ? rawText
                                                        : rawText.replace(/<data>[\s\S]*?<\/data>/g, '').trim()
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}

                    {messages.length > 0 && (() => {
                        const lastMessage = messages[messages.length - 1];
                        if (lastMessage.role !== 'user') {
                            const hasNoParts = !lastMessage.parts || lastMessage.parts.length === 0;
                            const isFirstPartEmpty = lastMessage.parts?.[0]?.type === 'text' && !lastMessage.parts[0].text?.trim();
                            return hasNoParts || isFirstPartEmpty
                        }
                        return false
                    })() && (
                            <div className="flex flex-col items-start space-y-1 animate-pulse">
                                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 px-1 uppercase tracking-wider">
                                    Dedux AI
                                </span>
                                <div className="bg-slate-800 text-white text-sm font-medium rounded-2xl rounded-bl-none px-4 py-3 shadow-xs border border-slate-700/50 dark:bg-gray-900 dark:border-gray-800 flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span className="dark:text-gray-300">Pensando...</span>
                                </div>
                            </div>
                        )}
                </div>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault()
                if (input.trim()) {
                    sendMessage({ text: input }) // Envia el texto limpio
                    setInput('')
                }
            }} className="mt-6 flex flex-col gap-3">
                <div className="relative group">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ej: ¿Cuánto gasté este mes en servicios? o 'Agrega un gasto de $450 en papelería'..."
                        className="w-full min-h-24 border border-gray-200 p-4 rounded-xl text-base text-gray-950 placeholder-gray-400 focus:outline-hidden focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all resize-none dark:bg-gray-950 dark:border-gray-500 dark:text-white dark:focus:border-white dark:focus:ring-white"
                        disabled={isLoading}
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-gray-50 dark:border-gray-800/40">
                    <p className="text-xs text-gray-400">
                        La IA analizará las {transactions?.length || 0} transacciones activas de este mes o generará nuevas facturas por ti.
                    </p>

                    <div className="flex flex-col lg:flex-row items-center gap-2 w-full sm:w-auto">
                        <button
                            type="submit"
                            className="flex-1 sm:flex-none inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider text-white bg-gray-950 py-3 px-5 rounded-xl hover:bg-gray-800 shadow-xs transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:pointer-events-none dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100"
                            disabled={isLoading || !input.trim()}
                        >
                            {status === 'streaming' ? 'Pensando...' : 'Consultar'}
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}