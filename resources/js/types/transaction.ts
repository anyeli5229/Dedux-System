type TransactionType = 'expense' | 'income';
type TransactionCategory = 'services' | 'supplies' | 'transport' | 'marketing' | 'meals' | 'taxes' | 'payroll' | 'others';
type TransactionStatusType = 'pending_review' | 'verified';

export type Transaction = {
    id: number
    type: TransactionType
    description: string
    provider_name: string
    provider_tax_id: string
    subtotal: string
    tax: string
    total_amount: string
    currency: string
    transaction_date: string
    attachment_path?: string
    category: TransactionCategory
    status: TransactionStatusType
}

export type TransactionFieldsForm = Omit<Transaction, 'id' | 'status' | 'attachment_path'> & {
    attachment?: File | null // 👈 Aquí se guarda el archivo cuando el usuario lo arrastra o selecciona
}