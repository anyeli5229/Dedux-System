import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { route } from 'ziggy-js';

createInertiaApp({
    title: (title) => title ? `Dedux - ${title}` : 'Dedux',

    resolve: (name) => {
        //Busca en todas las carpetas internas -> {./Pages/Auth/Login.tsx}
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
        // Se busca la página de forma dinámica en el objeto
        const page = pages[`./Pages/${name}.tsx`] as { default: any }

        if (!page) {
            throw new Error(`La página ./Pages/${name}.tsx no existe.`)
        }

        return page.default
    },

    setup({ el, App, props }) {
        if (typeof window !== 'undefined' && props.initialPage.props.ziggy) {
            window.route = (name, params, absolute, config) =>
                route(name, params, absolute, props.initialPage.props.ziggy as any);
        }

        createRoot(el).render(<App {...props} />)
    },
})