import { LoginFieldsForm } from "@/types/auth"
import ErrorMessage from "../Transactions/components/ErrorMessage"

interface LoginFormProps {
    data: LoginFieldsForm
    setData: (key: keyof LoginFieldsForm, value: any) => void
    errors: Record<string, string>
}

export default function LoginForm({ data, setData, errors }: LoginFormProps) {
    return (
        <>
            <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-300" htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="ejemplo@correo.com"
                    className={`w-full border dark:border-white p-3 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-hidden focus:ring-2 focus:border-transparent transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-800 focus:ring-cyan-400/60 focus:border-cyan-500'}`}
                    value={data.email}
                    onChange={e => setData('email', e.target.value)} />

                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-300" htmlFor="password">Contraseña</label>
                    <a href="/auth/forgot-password" className="text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50 transition-colors" tabIndex={3}>
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
                <input type="password" id="password" name="password" placeholder="Ingresa tu contraseña"
                    className={`w-full border dark:border-white  p-3 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-hidden focus:ring-2 focus:border-transparent transition-all ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-800 focus:ring-cyan-400/60 focus:border-cyan-500'}`} 
                    autoComplete="current-password"
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                />

                {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </div>
        </>
    )
}