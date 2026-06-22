import { RegisterFieldForm } from "@/types/auth"
import ErrorMessage from "../Transactions/components/ErrorMessage"

interface RegisterFormProps {
    data: RegisterFieldForm
    setData: (key: keyof RegisterFieldForm, value: any) => void 
    errors: Record<string, string>
}

export default function RegisterForm({ data, setData, errors }: RegisterFormProps) {
    return (
        <>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700" htmlFor="name">Nombre</label>
                <input type="text" id="name" name="name" placeholder="Tu nombre"
                    className={`w-full border dark:border-white  p-3 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500  focus:outline-hidden focus:ring-2 focus:border-transparent transition-all ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-800 focus:ring-cyan-400/60 focus:border-cyan-500'}`}
                    value={data.name}
                    onChange={e => setData('name', e.target.value)} />

                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700" htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="ejemplo@correo.com"
                    className={`w-full border dark:border-white  p-3 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500  focus:outline-hidden focus:ring-2 focus:border-transparent transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-800 focus:ring-cyan-400/60 focus:border-cyan-500'}`}
                    value={data.email}
                    onChange={e => setData('email', e.target.value)} />

                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700" htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="Ingresa tu contraseña"
                    className={`w-full border dark:border-white  p-3 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500  focus:outline-hidden focus:ring-2 focus:border-transparent transition-all ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-800 focus:ring-cyan-400/60 focus:border-cyan-500'}`} 
                    autoComplete="new-password"
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                />

                {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700" htmlFor="password_confirmation">Repetir Contraseña</label>
                <input type="password" id="password_confirmation" name="password_confirmation" placeholder="Repite tu contraseña"
                    className={`w-full border dark:border-white  p-3 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500  focus:outline-hidden focus:ring-2 focus:border-transparent transition-all ${errors.password_confirmation ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-800 focus:ring-cyan-400/60 focus:border-cyan-500'}`} 
                    autoComplete="new-password"
                    value={data.password_confirmation}
                    onChange={e => setData('password_confirmation', e.target.value)}
                />
                {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation}</ErrorMessage>}
            </div>
        </>
    )
}