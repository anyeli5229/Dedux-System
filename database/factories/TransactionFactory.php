<?php

namespace Database\Factories;

use App\CategoryType;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    protected $model = Transaction::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Forzamos a Faker a darnos datos en español
        $this->faker->locale = 'es_ES';

        // Generamos subtotal y tasas coherentes para pre-contabilidad
        $subtotal = $this->faker->randomFloat(2, 10, 1500); // Montos entre $10 y $1500
        $tax = round($subtotal * 0.16, 2); // Calculamos un IVA simulado del 16%
        $totalAmount = $subtotal + $tax;

        return [
            // Crea un usuario en la BD sobre la marcha si no se especifica uno
            'user_id' => User::factory(),
            
            // Asignamos una categoría directamente como texto desde un array predefinido
            'category'  => $this->faker->randomElement(CategoryType::cases())->value,

            // Descripciones realistas para que haga match con el negocio
            'description' => $this->faker->randomElement([
                'Pago de servicio de internet empresarial',
                'Compra de artículos de oficina',
                'Suscripción mensual de software en la nube',
                'Consumo de restaurante con clientes',
                'Licencia de IDE de desarrollo',
                'Compra de disco duro de respaldo',
                'Servicios de asesoría mensual',
                'Flete de mercancía'
            ]),
            
            'subtotal' => $subtotal,
            'tax' => $tax,
            'total_amount' => $totalAmount,
            
            // 'income' para ingresos, 'expense' para gastos
            'type' => $this->faker->randomElement(['income', 'expense']),
            
            // Genera fechas aleatorias de los últimos meses hasta el día de hoy
            'transaction_date' => $this->faker->dateTimeBetween('-5 months', 'now'),
        ];
    }
}