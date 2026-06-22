export function formatDate(dateString: string | null) {
    if(!dateString) return
    
    return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(amount)
}

export const CATEGORY_TRANSLATIONS: Record<string, string> = {
    services: 'Servicios y software',
    supplies: 'Suministros y oficina',
    transport: 'Transporte y gasolina',
    marketing: 'Marketing y publicidad',
    meals: 'Comidas y clientes',
    taxes: 'Impuestos / Tasas',
    payroll: 'Nómina y contratistas',
    others: 'Otros / Gastos Varios',
}

export const formatCategory = (name: string): string => {
    const translated = CATEGORY_TRANSLATIONS[name.toLowerCase()];
    if (translated) return translated

    return name
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
}