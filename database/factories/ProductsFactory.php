<?php

namespace Database\Factories;

use App\Models\Products;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductsFactory extends Factory
{
    protected $model = Products::class;

    public function definition()
    {
        return [
            'nome' => $this->faker->word,
            'preco' => $this->faker->randomFloat(2, 1, 1000),
            'quantidade' => $this->faker->numberBetween(1, 100),
            'descricao' => $this->faker->sentence,
        ];
    }
}
