/// <reference types="vite/client" />
import { createInertiaApp } from '@inertiajs/react'

createInertiaApp({
    title: title => `Dedux - ${title}`,
    pages: {
        path: './Pages',
        extension: '.tsx',
    },
})