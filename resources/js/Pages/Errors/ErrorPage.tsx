import { Head, Link } from '@inertiajs/react';

type ErrorPageProps = {
    status: number
}

export default function ErrorPage({ status }: ErrorPageProps) {
    
    const errorDetails: Record<number, { title: string; description: string }> = {
        404: {
            title: "Página no encontrada",
            description: "El recurso que buscas no existe o fue movido a otra ubicación."
        },
        403: {
            title: "Acceso denegado",
            description: "No tienes los permisos necesarios para visualizar esta sección."
        },
        500: {
            title: "Error del servidor",
            description: "Algo salió mal de nuestro lado. Estamos trabajando en solucionarlo."
        }
    }

    const { title, description } = errorDetails[status] || {
        title: "Ups, ocurrió un error",
        description: "Algo no salió como esperábamos. Por favor, vuelve a intentarlo."
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center p-6 transition-colors duration-200">
            <Head title={`${status} — ${title}`} />

            <div className="w-full max-w-md text-center">
                <span className="block text-8xl sm:text-9xl font-black tracking-tighter text-gray-900/10 dark:text-white/5 select-none leading-none">
                    {status}
                </span>

                <div className="mt-4">
                    <h1 className="text-2xl font-black text-gray-950 dark:text-white tracking-tight sm:text-3xl">
                        {title}
                    </h1>
                    <p className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="mt-8 flex justify-center gap-4">

                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center font-black text-xs uppercase tracking-wider text-white bg-gray-950 hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 py-3.5 px-6 rounded-xl transition-all duration-200 cursor-pointer shadow-sm"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </div>

        </div>
    );
}