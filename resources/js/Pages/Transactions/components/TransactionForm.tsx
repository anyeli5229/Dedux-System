import { TransactionFieldsForm } from "@/types/transaction"
import ErrorMessage from "./ErrorMessage"


interface TransactionFormProps {
    data: TransactionFieldsForm
    setData: (key: any, value: any) => void
    errors: Record<string, string> // Atrapa los errores de validación de Laravel
}

export default function TransactionForm({ data, setData, errors }: TransactionFormProps) {
    return (
        <>

            <div className="flex flex-col gap-2">
                <label className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-gray-100" htmlFor="description">Descripción</label>
                <input 
                    id="description" 
                    type="text"
                    placeholder="Ej. Compra de papelería, Pago de hosting mensual, Factura de cliente"
                    className="w-full border border-gray-300 dark:border-gray-800 p-3 rounded-lg focus:outline-none focus:border-gray-950 dark:focus:border-gray-100 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 transition-colors" 
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                />
                {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-gray-100" htmlFor="provider_name">
                        Proveedor / Emisor <span className="text-lg font-normal text-gray-500 dark:text-gray-400">(Opcional)</span>
                    </label>
                    <input 
                        id="provider_name" 
                        type="text"
                        placeholder="Ej. Amazon Inc, Starbucks, Gasolinera S.A."
                        className="w-full border border-gray-300 dark:border-gray-800 p-3 rounded-lg focus:outline-none focus:border-gray-950 dark:focus:border-gray-100 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 transition-colors" 
                        value={data.provider_name || ''}
                        onChange={e => setData('provider_name', e.target.value)}
                    />
                    {errors.provider_name && <ErrorMessage>{errors.provider_name}</ErrorMessage>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-gray-100" htmlFor="provider_tax_id">
                        Identificación Fiscal (RFC/NIT) <span className="text-lg font-normal text-gray-500 dark:text-gray-400">(Opcional)</span>
                    </label>
                    <input 
                        id="provider_tax_id" 
                        type="text"
                        placeholder="Ej. AMA961201L12"
                        className="w-full border border-gray-300 dark:border-gray-800 p-3 rounded-lg focus:outline-none focus:border-gray-950 dark:focus:border-gray-100 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 transition-colors" 
                        value={data.provider_tax_id || ''}
                        onChange={e => setData('provider_tax_id', e.target.value)}
                    />
                    {errors.provider_tax_id && <ErrorMessage>{errors.provider_tax_id}</ErrorMessage>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-lg text-gray-900 dark:text-gray-100" htmlFor="currency">Moneda</label>
                    <select 
                        id="currency" 
                        className="w-full border border-gray-300 dark:border-gray-800 p-3 rounded-lg focus:outline-none focus:border-gray-950 dark:focus:border-gray-100 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 transition-colors"
                        value={data.currency}
                        onChange={e => setData('currency', e.target.value)}
                    >
                        <option value="MXN" className="dark:bg-gray-900">MXN ($)</option>
                        <option value="USD" className="dark:bg-gray-900">USD (US$)</option>
                        <option value="COP" className="dark:bg-gray-900">COP ($)</option>
                        <option value="EUR" className="dark:bg-gray-900">EUR (€)</option>
                    </select>
                    {errors.currency && <ErrorMessage>{errors.currency}</ErrorMessage>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-lg text-gray-900 dark:text-gray-100" htmlFor="subtotal">Subtotal</label>
                    <input 
                        id="subtotal" 
                        type="number" 
                        min="0" 
                        step="0.01" 
                        placeholder="0.00"
                        className="w-full border border-gray-300 dark:border-gray-800 p-3 rounded-lg focus:outline-none focus:border-gray-950 dark:focus:border-gray-100 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 transition-colors"
                        value={data.subtotal}
                        onChange={e => setData('subtotal', e.target.value)}
                    />
                    {errors.subtotal && <ErrorMessage>{errors.subtotal}</ErrorMessage>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-lg text-gray-900 dark:text-gray-100" htmlFor="tax">IVA / Impuestos</label>
                    <input 
                        id="tax" 
                        type="number" 
                        min="0" 
                        step="0.01" 
                        placeholder="0.00"
                        className="w-full border border-gray-300 dark:border-gray-800 p-3 rounded-lg focus:outline-none focus:border-gray-950 dark:focus:border-gray-100 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 transition-colors"
                        value={data.tax}
                        onChange={e => setData('tax', e.target.value)}
                    />
                    {errors.tax && <ErrorMessage>{errors.tax}</ErrorMessage>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-lg text-gray-900 dark:text-gray-100" htmlFor="total_amount">Monto Total</label>
                    <input 
                        id="total_amount" 
                        type="number" 
                        min="0" 
                        step="0.01" 
                        placeholder="0.00"
                        className="w-full border border-gray-300 dark:border-gray-800 p-3 rounded-lg focus:outline-none focus:border-gray-950 dark:focus:border-gray-100 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 transition-colors"
                        value={data.total_amount}
                        onChange={e => setData('total_amount', e.target.value)}
                    />
                    {errors.total_amount && <ErrorMessage>{errors.total_amount}</ErrorMessage>}
                </div>
            </div>

            {/* Tipo de Transacción */}
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                    <label className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-gray-100" htmlFor="type">Tipo de Transacción</label>
                    <div className="relative inline-block group">
                        <button 
                            type="button"
                            className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-950 text-xs font-bold focus:outline-none"
                        >
                            i
                        </button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-lg bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-950 p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-sm font-normal z-10 shadow-lg border border-transparent dark:border-gray-200">
                            <p><span className="font-bold text-orange-500 dark:text-orange-600">Gasto:</span> Salidas de dinero indispensables para tu actividad (Deducibles).</p>
                            <p className="mt-2"><span className="font-bold text-green-500 dark:text-green-600">Ingreso:</span> Entradas de dinero por tus servicios prestados o ventas.</p>
                        </div>
                    </div>
                </div>

                <select 
                    id="type" 
                    className="w-full border border-gray-300 dark:border-gray-800 p-3 rounded-lg focus:outline-none focus:border-gray-950 dark:focus:border-gray-100 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 transition-colors"
                    value={data.type}
                    onChange={e => setData('type', e.target.value)}
                >
                    <option value="expense" className="dark:bg-gray-900">Gasto (Egreso)</option>
                    <option value="income" className="dark:bg-gray-900">Ingreso</option>
                </select>
                {errors.type && <ErrorMessage>{errors.type}</ErrorMessage>}
            </div>

            {/* Categoría */}
            <div className="flex flex-col gap-2">
                <label className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-gray-100" htmlFor="category">Categoría</label>
                <select 
                    id="category" 
                    className="w-full border border-gray-300 dark:border-gray-800 p-3 rounded-lg focus:outline-none focus:border-gray-950 dark:focus:border-gray-100 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 transition-colors"
                    value={data.category}
                    onChange={e => setData('category', e.target.value)}
                >
                    <option value="" disabled className="dark:bg-gray-900">-- Selecciona una categoría --</option>
                    <option value="services" className="dark:bg-gray-900">Servicios y Software</option>
                    <option value="supplies" className="dark:bg-gray-900">Suministros y Oficina</option>
                    <option value="transport" className="dark:bg-gray-900">Transporte y Gasolina</option>
                    <option value="marketing" className="dark:bg-gray-900">Marketing y Publicidad</option>
                    <option value="meals" className="dark:bg-gray-900">Comidas y Clientes</option>
                    <option value="taxes" className="dark:bg-gray-900">Impuestos / Tasas</option>
                    <option value="payroll" className="dark:bg-gray-900">Nómina y Contratistas</option>
                    <option value="others" className="dark:bg-gray-900">Otros / Gastos Varios</option>
                </select>
                {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
            </div>

            {/* Fecha de Emisión */}
            <div className="flex flex-col gap-2">
                <label className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-gray-100" htmlFor="transaction_date">Fecha de Emisión</label>
                <input 
                    id="transaction_date" 
                    type="date"
                    className="w-full border border-gray-300 dark:border-gray-800 p-3 rounded-lg focus:outline-none focus:border-gray-950 dark:focus:border-gray-100 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 transition-colors"
                    value={data.transaction_date}
                    onChange={e => setData('transaction_date', e.target.value)}
                />
                {errors.transaction_date && <ErrorMessage>{errors.transaction_date}</ErrorMessage>}
            </div>
        </>
    )
}