import { formatCategory } from '@/utils';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

type ChartCardProps = {
    chartData: Record<string, string | number>; // { "Combustible": 350, "Servicios": "1200", "Arrendamiento": 800 }
}

const COLORS = ['#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#155e75']

export default function ChartCard({ chartData }: ChartCardProps) {

    // Transforma el objeto en el arreglo de objetos [{name: 'Comidas y Clientes', value: 250}]
    const data = Object.entries(chartData).map(([name, value]) => {

        return {
            name: formatCategory(name),
            value: parseFloat(value.toString()) || 0,
        }
    })

    //console.log(data)
    const total = data.reduce((sum, item) => sum + item.value, 0)

    return (
        <div className="md:col-span-2 bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-500 shadow-sm flex flex-col justify-between transition-colors relative">
            
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">Gastos por categoría</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Distribución de egresos del mes</p>
                </div>
                <div className="text-right bg-gray-50 dark:bg-gray-900/60 px-3 py-1.5 rounded-xl border border-gray-100/70 dark:border-gray-900 transition-colors">
                    <span className="block text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Total Gastado</span>
                    <span className="text-lg font-extrabold text-gray-900 dark:text-cyan-400">${total.toFixed(2)}</span>
                </div>
            </div>

            <div className="h-64 w-full flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height={256}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%" // Centrado horizontal
                            cy="50%" // Centrado vertical
                            innerRadius={65} // hueco ligeramente más amplio para un look más fino
                            outerRadius={90} // ancho
                            paddingAngle={3} // Separación entre rebanadas
                            dataKey="value"
                            stroke="transparent" // Elimina el borde blanco por defecto de Recharts
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>

                        <Tooltip
                            contentStyle={{ 
                                backgroundColor: 'var(--tw-chart-bg, #fff)', 
                                borderRadius: '12px', 
                                border: '1px solid var(--tw-chart-border, #e2e8f0)' 
                            }}
                            itemStyle={{ color: 'var(--tw-chart-text, #0f172a)' }}
                            formatter={(value, name) => [`$${value}`, `${name}`]}
                        />

                        {/* nombres de las categorías */}
                        <Legend
                            iconType="circle"
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .dark .recharts-legend-item-text {
                    color: #9ca3af !important;
                }
                .dark .recharts-default-tooltip {
                    background-color: #030712 !important;
                    border-color: #111827 !important;
                }
                .dark .recharts-tooltip-item {
                    color: #f3f4f6 !important;
                }
            `}} />
        </div>
    )
}