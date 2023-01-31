<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class OutletSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'name' => 'Buah Batu',
                'address' => 'Jl. Soekarno Hatta No.482, Batununggal, Kec. Bandung Kidul, Kota Bandung, Jawa Barat 40266',
                'city' => 'bandung',
                'phone' => '829292929',
                'status' => 'open',
            ],
            [
                'name' => 'Pasteur',
                'address' => 'Jln. Pasteur, Bandung',
                'city' => 'bandung',
                'phone' => '08291923583',
                'status' => 'open',
            ],
            [
                'name' => 'Tebet',
                'address' => 'Jl. Prof DR. Soepomo No.6 RT14/RW6, Tebet Barat Jakarta Selatan',
                'city' => 'jakarta',
                'phone' => '082908992929232323231923583',
                'status' => 'open',
            ],
            [
                'name' => 'Lenteng Agung 1',
                'address' => 'Jl. Raya Lenteng Agung RT4/RW1 Lenteng Agung, Jagakarsa, Jakarta Selatan',
                'city' => 'jakarta',
                'phone' => '8292929292',
                'status' => 'open',
            ],
            [
                'name' => 'Sarinah',
                'address' => 'Jl. H. Agus Salim No. 60 A RT8, RW4 Gondangdia, Menteng, Jakarta Pusat',
                'city' => 'jakarta',
                'phone' => '0814839993',
                'status' => 'open',
            ]
        ];

        foreach ($data as $outlet) {
            \App\Models\Outlet::create($outlet);
        }
    }
}
