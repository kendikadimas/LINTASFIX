<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Teknik Informatika',
                'slug' => 'teknik-informatika',
                'description' => 'Laptop, komponen PC, buku algoritma, dan perangkat keras jaringan.',
                'icon' => '💻',
            ],
            [
                'name' => 'Teknik Geologi',
                'slug' => 'teknik-geologi',
                'description' => 'Palu geologi, kompas, GPS, lup, dan peralatan pemetaan.',
                'icon' => '🌍',
            ],
            [
                'name' => 'Teknik Sipil',
                'slug' => 'teknik-sipil',
                'description' => 'Theodolite, waterpass, meteran laser, helm proyek, dan buku struktur.',
                'icon' => '🏗️',
            ],
            [
                'name' => 'Teknik Industri',
                'slug' => 'teknik-industri',
                'description' => 'Kalkulator statistik, stopwatch, buku manajemen kualitas, dan software simulasi.',
                'icon' => '📈',
            ],
            [
                'name' => 'Teknik Elektro',
                'slug' => 'teknik-elektro',
                'description' => 'Multimeter, osiloskop, solder, breadboard, dan komponen elektronika.',
                'icon' => '⚡',
            ],
            [
                'name' => 'Teknik Mesin',
                'slug' => 'teknik-mesin',
                'description' => 'Jangka sorong, mikrometer, kunci pas, buku termodinamika, dan alat gambar teknik.',
                'icon' => '⚙️',
            ],
            [
                'name' => 'Teknik Komputer',
                'slug' => 'teknik-komputer',
                'description' => 'Raspberry Pi, Arduino, sensor kit, kabel jumper, dan perangkat IoT.',
                'icon' => '🤖',
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}