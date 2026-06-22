import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";
import ErrorMessage from "../Transactions/components/ErrorMessage";

export default function UpdatePassword() {
    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put('/dashboard/settings/password', { preserveScroll: true })
        reset()
    }

    const title = "Seguridad y privacidad"

    return (
        <AppLayout title={title}>
            <Head title={title} />

            <div className="max-w-2xl mx-auto my-12 px-6">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-gray-100 dark:border-gray-500">
                    <div>
                        <h1 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight">
                            Ajustes de cuenta
                        </h1>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                            Modifica tu contraseña y mantén tu cuenta segura.
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

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-500 dark:bg-gray-950">
                    <div className="mb-5">
                        <h2 className="text-lg font-bold text-gray-950 dark:text-white tracking-tight">
                            Actualizar Contraseña
                        </h2>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                            Asegúrate de usar una contraseña larga y aleatoria para mantener la seguridad.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400" htmlFor="current_password">
                                Contraseña Actual
                            </label>
                            <input
                                id="current_password"
                                type="password"
                                value={data.current_password}
                                onChange={e => setData('current_password', e.target.value)}
                                placeholder="••••••••"
                                className="w-full text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 bg-transparent border border-gray-200 dark:border-gray-800 p-3 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200"
                            />
                            {errors.current_password && <p className="text-xs font-semibold text-red-500 mt-0.5">{errors.current_password}</p>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400" htmlFor="password">
                                Nueva Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                placeholder="••••••••"
                                className="w-full text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 bg-transparent border border-gray-200 dark:border-gray-800 p-3 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200"
                            />
                            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400" htmlFor="password_confirmation">
                                Confirmar Contraseña
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                placeholder="••••••••"
                                className="w-full text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 bg-transparent border border-gray-200 dark:border-gray-800 p-3 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200"
                            />
                            {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation}</ErrorMessage>}
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto inline-flex items-center justify-center font-black text-xs uppercase tracking-wider text-white bg-gray-950 hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 py-3 px-6 rounded-xl transition-all duration-200 cursor-pointer shadow-xs disabled:opacity-50"
                            >
                                {processing ? 'Actualizando...' : 'Actualizar Contraseña'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}