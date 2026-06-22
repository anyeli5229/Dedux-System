import { useState } from 'react'
import { Link } from '@inertiajs/react'
import DropdownMenu from './DropdownMenu'
import Logo from './Logo'
import { User } from '@/types'
import SubscriptionBadge from './SubscriptionBadge'

type NavLink = {
    label: string
    href: string
}

type HeaderProps = {
    user?: User | null
    links?: NavLink[]
    actionLink?: NavLink
}

export default function Header({ user, links = [], actionLink = { label: 'Iniciar Sesión', href: '/auth/login' } }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-300 dark:border-gray-700 transition-colors mb-3">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

                <div className="flex items-center">
                    <Logo />
                </div>

                {/* --- MENÚ DESKTOP (Pantallas medianas y grandes) --- */}
                {/* --- Oculta el elemento en pantallas desde 0 a 640px(hidden) --- */}
                <div className="hidden sm:flex items-center gap-6">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <SubscriptionBadge plan={user.plan} />
                            <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                                Hola: <span className="font-bold text-gray-950 dark:text-white">{user.name}</span>
                            </p>
                            <div className="text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white text-sm py-1 cursor-pointer transition-colors">
                                <DropdownMenu subscribed={user.subscribed} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            {links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <Link
                                href={actionLink.href}
                                className="inline-flex items-center justify-center font-black text-[10px] uppercase tracking-widest text-white bg-gray-950 hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 py-2.5 px-4 rounded-xl transition-all duration-200 shadow-xs"
                            >
                                {actionLink.label}
                            </Link>
                        </div>
                    )}
                </div>

                {/* --- BOTÓN HAMBURGUESA (Solo Móvil) --- */}
                {/* --- Desaparece a partir de 640px o más(sm:hidden) --- */}
                <div className="flex sm:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white focus:outline-none p-1"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                          )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* --- MENÚ DESPLEGABLE MÓVIL --- */}
            {isOpen && (
                <div className="sm:hidden border-t border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-950 px-6 py-4 space-y-4 animate-fade-in">
                    {user ? (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                                    Hola: <span className="font-bold text-gray-950 dark:text-white">{user.name}</span>
                                </p>
                                <SubscriptionBadge plan={user.plan} />
                            </div>
                            <div className="border-t border-gray-100 dark:border-gray-900 pt-2">
                                <DropdownMenu subscribed={user.subscribed} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white transition-colors block py-1"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <Link
                                href={actionLink.href}
                                className="w-full inline-flex items-center justify-center font-black text-[10px] uppercase tracking-widest text-white bg-gray-950 hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 py-3 px-4 rounded-xl transition-all duration-200 shadow-xs text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                {actionLink.label}
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}