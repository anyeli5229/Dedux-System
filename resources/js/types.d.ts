import "@inertiajs/core";

export interface User {
    name: string
    subscribed: boolean
    plan: 'monthly' | 'yearly' | null
    email: string
}

declare module "@inertiajs/core" {
    export interface PageProps {
        flash: {
            success?: string | null
            error?: string | null
        }
        auth: {
            user: User //User si está logueado, o null si es guest
        }
    }
}