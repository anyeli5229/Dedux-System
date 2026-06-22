import AppLayout from "../Layouts/AppLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import ErrorMessage from "../Transactions/components/ErrorMessage";

export default function UpdateProfile() {

    const { auth: {user : {name, email,}} } = usePage().props

    const { data, setData, put, processing, errors } = useForm({
        name,
        email,
    })

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        put('/dashboard/settings/profile', { preserveScroll: true })
    }

    const title = "Ajustes de Perfil"

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
                            Modifica tu información personal y mantén tu cuenta segura.
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

                <div className="space-y-8">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-500 dark:bg-gray-950">
                        <div className="mb-5">
                            <h2 className="text-lg font-bold text-gray-950 dark:text-white tracking-tight">
                                Información del Perfil
                            </h2>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                Actualiza el nombre y la dirección de correo electrónico de tu cuenta.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400" htmlFor="name">
                                    Nombre
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="Tu nombre"
                                    className="w-full text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 bg-transparent border border-gray-200 dark:border-gray-800 p-3 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200"
                                />
                                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    placeholder="Tu email"
                                    className="w-full text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 bg-transparent border border-gray-200 dark:border-gray-800 p-3 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200"
                                />
                                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                            </div>

                            <div className="flex justify-end pt-2">
                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className="w-full sm:w-auto inline-flex items-center justify-center font-black text-xs uppercase tracking-wider text-white bg-gray-950 hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 py-3 px-6 rounded-xl transition-all duration-200 cursor-pointer shadow-xs disabled:opacity-50"
                                >
                                    {processing ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </AppLayout>
    )
}