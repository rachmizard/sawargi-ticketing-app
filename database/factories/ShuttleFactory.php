<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ShuttleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'number_plate' => $this->faker->regexify('[A-Z]{1,2} [0-9]{1,4} [A-Z]{1,3}'), // indonesia number plate
            'capacity' => $this->faker->numberBetween(10, 50),
            'status' => "available"
        ];
    }
}
