import { Link, usePage } from '@inertiajs/react'

export default function Logo() {

    const { auth } = usePage().props
    const user = auth.user
    const hrefLogo = user ? '/dashboard' : '/'

    return (
        <Link href={hrefLogo} className="flex items-center group hover:opacity-90 transition-opacity select-none">

            <div className="flex items-center justify-center w-11 h-11  bg-white text-gray-950 dark:bg-gray-950 dark:text-gray-200 shadow-xs hover:cursor-pointer gap-5">
                <svg className="w-6 h-6 shrink-0 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75h-1.5M13.5 10.5H21M13.5 13.5H19.5M3.75 16.5h16.5M10.5 7.5l-3 3 3 3" />
                </svg>
            </div>
            <span className="font-black text-3xl uppercase tracking-widest text-gray-950 dark:text-white cursor-pointer">
                Dedux
            </span>

        </Link>
    )
}