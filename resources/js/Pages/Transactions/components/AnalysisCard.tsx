import { formatCategory, formatCurrency } from "@/utils"

type AnalysisCardProps = {
    chartData: Record<string, number>
    totalExpense: number
}

export default function AnalysisCard({ chartData, totalExpense }: AnalysisCardProps) {

    const analysisData = Object.entries(chartData ?? {}).map(([category, amount]) => {
        const percentage = totalExpense > 0 ? (+amount / totalExpense) * 100 : 0

        return {
            category: formatCategory(category),
            amount: +amount,
            percentage
        }
    })

    const sortedData = analysisData.sort((a, b) => b.amount - a.amount)//sort ordena los elementos de un arreglo
    //a (el elemento actual) y b (el siguiente)
    //Si el resultado es positivo, significa que b es mayor que a, por lo que pone a b antes en la lista

    return (
        <div className="md:col-span-1 bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-500 shadow-sm flex flex-col justify-between transition-colors">
            
            <div className="mb-5">
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">Análisis de Gastos</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Impacto por cada categoría</p>
            </div>

            <div className="space-y-4 flex-1 flex flex-col justify-center">
                {sortedData.map((expense) => (
                    <div key={expense.category} className="space-y-1.5 group">
                        
                        {/* Fila superior: Texto y Montos */}
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-700 dark:text-gray-300 text-xs tracking-wide">
                                {expense.category}
                            </span>
                            <div className="text-right">
                                <span className="font-bold text-gray-900 dark:text-gray-100 text-xs">
                                    {formatCurrency(expense.amount)}
                                </span>
                                <span className="text-[10px] text-gray-400 dark:text-gray-400 font-semibold ml-1.5 bg-gray-50 dark:bg-gray-900 px-1.5 py-0.5 rounded-md transition-colors">
                                    {expense.percentage.toFixed(1)}%
                                </span>
                            </div>
                        </div>

                        <div className="w-full bg-gray-100 dark:bg-gray-900 h-2 rounded-full overflow-hidden transition-colors">
                            <div 
                                className="bg-gray-950 dark:bg-gray-50 h-full rounded-full transition-all duration-500 group-hover:bg-slate-600 dark:group-hover:bg-slate-400" 
                                style={{ width: `${expense.percentage}%` }}
                            />
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}