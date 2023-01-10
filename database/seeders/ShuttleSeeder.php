<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ShuttleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Shuttle::factory()->count(300)->create();
    }
}
