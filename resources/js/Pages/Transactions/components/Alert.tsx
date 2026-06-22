
type alertType = 'success' | 'error'

type AlertProps = {
    type?: alertType
    message: string | undefined | null
}

export default function Alert({ type = 'success', message }: AlertProps) {
    if (!message) return null

    const divClass = {
        'success': 'border-emerald-100 bg-emerald-50',
        'error': 'border-red-100 bg-red-50',
    }[type]//Acceso dinámico de los valores, se usa cuando el nombre de la propiedad ('success' o 'error') vive dentro de una variable (type) que puede cambiar

    const textColors = {
        'success': 'text-emerald-800',
        'error': 'text-red-600',
    }[type]

    const iconColors = {
        'success' : 'text-emerald-600',
        'error'   : 'text-red-600',
    }[type]

    return (
        <div className={`m-6 p-4 border rounded-xl flex items-center gap-2 ${divClass}`}>
            <svg className={`h-5 w-5 shrink-0 ${iconColors}`} fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {type === 'success' ? (
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                ) : (
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"></path>
                )}
            </svg>
            <p className={`text-sm font-semibold ${textColors}`}>
                {message}
            </p>
        </div>
    )
}
