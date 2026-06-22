import { Link, usePage } from '@inertiajs/react'

export default function Footer() {
    const currentYear = new Date().getFullYear()
    const { auth } = usePage().props
    const user = auth.user

    return (
        <footer className="w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-t border-gray-100 dark:border-gray-900 transition-colors mt-5">
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">
                    <span>&copy; {currentYear}</span>
                    <span className="font-black text-gray-950 dark:text-white tracking-widest text-[11px]">Dedux</span>
                    <span className="hidden sm:inline text-gray-300 dark:text-gray-800">|</span>
                    <span className="hidden sm:inline lowercase text-[11px]">Gestión inteligente</span>
                </div>

                {!user && (
                    <div className="flex items-center flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        <Link href="/" className="hover:text-gray-950 dark:hover:text-white transition-colors">
                            Inicio
                        </Link>
                        <Link href="/features" className="hover:text-gray-950 dark:hover:text-white transition-colors">
                            Características
                        </Link>
                        <Link href="/pricing" className="hover:text-gray-950 dark:hover:text-white transition-colors">
                            Planes
                        </Link>
                    </div>
                )}

            </div>
        </footer>
    )
}