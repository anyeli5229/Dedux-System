import { Link } from '@inertiajs/react'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'

type DropdownMenuProps = {
    subscribed: boolean
}

export default function DropdownMenu({ subscribed }: DropdownMenuProps) {
    return (
        <Menu as="div" className="relative inline-block text-left w-full sm:w-auto">
            <div>
                {/* w-full en móvil  */}
                <MenuButton className="flex items-center justify-between sm:justify-center w-full sm:w-auto rounded-xl p-2.5 sm:p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-gray-200 sm:border-transparent dark:border-gray-800 sm:dark:border-transparent focus:outline-none transition-all duration-200 cursor-pointer">
                    <span className="sm:hidden text-xs font-bold uppercase tracking-wider text-gray-500">Opciones de cuenta</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5.5 h-5.5 rotate-90 sm:rotate-0">
                        <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                    </svg>
                </MenuButton>
            </div>

            <MenuItems
                /* bottom: Abre el menú abajo del botón
                    end: Alinea el lado derecho del menú con el lado derecho del botón
                    espacio entre el botón y el menú
                */
                anchor={{ to: 'bottom end', gap: '8px' }}
                /* en móviles va a tomar un ancho de w-56 mientras que en pantallas más grandes va a tomar todo el ancho dejando un espacio de 24px a los lados */
                className="w-[calc(100vw-3rem)] sm:w-56 origin-top-right rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg outline-none transition transition-discrete data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:border-gray-800 dark:bg-gray-950"
            >
                <div className="flex flex-col gap-0.5">
                    <MenuItem>
                        <Link
                            href="/dashboard"
                            className="block px-4 py-3 sm:py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-150 cursor-pointer font-medium"
                        >
                            Panel de administración
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <Link
                            href="/dashboard/settings/profile"
                            className="block px-4 py-3 sm:py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-150 cursor-pointer font-medium"
                        >
                            Ajustes/Perfil
                        </Link>
                    </MenuItem>

                    {subscribed && (
                        <MenuItem>
                            <Link
                                href="/subscription"
                                className="block px-4 py-3 sm:py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-150 cursor-pointer font-medium"
                            >
                                Subscripción
                            </Link>
                        </MenuItem>
                    )}

                    <MenuItem>
                        <Link
                            href="/dashboard/settings/password"
                            className="block px-4 py-3 sm:py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-150 cursor-pointer font-medium"
                        >
                            Cambiar contraseña
                        </Link>
                    </MenuItem>

                    <div className="my-1 border-t border-gray-100 dark:border-gray-800" />

                    <MenuItem>
                        <Link
                            href="/auth/logout"
                            method="post"
                            as="button"
                            className="block w-full text-left px-4 py-3 sm:py-2 text-sm text-red-600 font-semibold hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 rounded-lg transition-colors duration-150 cursor-pointer"
                        >
                            Cerrar sesión
                        </Link>
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    )
}