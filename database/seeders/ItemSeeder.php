<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all()->keyBy('slug');
        $users = User::all();

        $items = [
            // Teknik Informatika
            [
                'user_id' => $users->random()->id,
                'category_id' => $categories['teknik-informatika']->id,
                'name' => 'Buku "Introduction to Algorithms" (CLRS)',
                'description' => 'Buku wajib anak informatika, kondisi masih bagus, hard cover.',
                'price' => 350000,
                'availability_type' => 'sale',
                'condition' => 'good',
                'image' => 'https://picsum.photos/seed/clrs/400/500' // Gambar buku
            ],
            [
                'user_id' => $users->random()->id,
                'category_id' => $categories['teknik-informatika']->id,
                'name' => 'Mechanical Keyboard Keychron K2',
                'description' => 'Keyboard wireless/wired, brown switch. Cocok untuk ngoding.',
                'price' => 950000,
                'rental_price_per_day' => 50000,
                'availability_type' => 'both',
                'condition' => 'excellent',
                'is_featured' => true,
                'image' => 'https://picsum.photos/seed/keychron/400/500' // Gambar keyboard
            ],

            // Teknik Geologi
            [
                'user_id' => $users->random()->id,
                'category_id' => $categories['teknik-geologi']->id,
                'name' => 'Palu Geologi Estwing',
                'description' => 'Palu sedimen original Estwing, jarang dipakai, kondisi 95%.',
                'price' => 800000,
                'availability_type' => 'sale',
                'condition' => 'excellent',
                'image' => 'https://picsum.photos/seed/palu/400/500' // Gambar palu
            ],
            [
                'user_id' => $users->random()->id,
                'category_id' => $categories['teknik-geologi']->id,
                'name' => 'Kompas Geologi Brunton',
                'description' => 'Kompas Brunton untuk pemetaan lapangan, lengkap dengan case kulit.',
                'rental_price_per_day' => 100000,
                'availability_type' => 'rent',
                'condition' => 'good',
                'is_featured' => true,
                'image' => 'https://picsum.photos/seed/kompas/400/500' // Gambar kompas
            ],

            // Teknik Sipil
            [
                'user_id' => $users->random()->id,
                'category_id' => $categories['teknik-sipil']->id,
                'name' => 'Theodolite Digital Topcon DT-209',
                'description' => 'Sewa Theodolite untuk praktikum ukur tanah. Lengkap dengan tripod dan rambu ukur.',
                'rental_price_per_day' => 250000,
                'availability_type' => 'rent',
                'condition' => 'good',
                'image' => 'https://picsum.photos/seed/theodolite/400/500' // Gambar theodolite
            ],
            
            // Teknik Industri
            [
                'user_id' => $users->random()->id,
                'category_id' => $categories['teknik-industri']->id,
                'name' => 'Buku "Manajemen Operasi" Heizer Render',
                'description' => 'Buku acuan untuk mata kuliah manajemen operasi dan produksi.',
                'price' => 200000,
                'availability_type' => 'sale',
                'condition' => 'fair',
                'image' => 'https://picsum.photos/seed/manajemen/400/500' // Gambar buku manajemen
            ],

            // Teknik Elektro
            [
                'user_id' => $users->random()->id,
                'category_id' => $categories['teknik-elektro']->id,
                'name' => 'Digital Osiloskop Rigol DS1054Z',
                'description' => 'Osiloskop 4 channel 50MHz, cocok untuk praktikum rangkaian listrik dan elektronika.',
                'rental_price_per_day' => 150000,
                'availability_type' => 'rent',
                'condition' => 'excellent',
                'is_featured' => true,
                'image' => 'https://picsum.photos/seed/osiloskop/400/500' // Gambar osiloskop
            ],
            [
                'user_id' => $users->random()->id,
                'category_id' => $categories['teknik-elektro']->id,
                'name' => 'Multimeter Digital Sanwa CD800a',
                'description' => 'Multimeter digital akurat dan handal, original Sanwa.',
                'price' => 450000,
                'availability_type' => 'sale',
                'condition' => 'good',
                'image' => 'https://picsum.photos/seed/multimeter/400/500' // Gambar multimeter
            ],

            // Teknik Mesin
            [
                'user_id' => $users->random()->id,
                'category_id' => $categories['teknik-mesin']->id,
                'name' => 'Jangka Sorong Digital Mitutoyo 150mm',
                'description' => 'Kaliper digital presisi tinggi, kondisi seperti baru.',
                'price' => 1500000,
                'availability_type' => 'sale',
                'condition' => 'excellent',
                'image' => 'https://picsum.photos/seed/jangka/400/500' // Gambar jangka sorong
            ],

            // Teknik Komputer
            [
                'user_id' => $users->random()->id,
                'category_id' => $categories['teknik-komputer']->id,
                'name' => 'Arduino Uno R3 Starter Kit',
                'description' => 'Kit lengkap untuk pemula, termasuk Arduino, breadboard, sensor, dan kabel jumper.',
                'price' => 250000,
                'availability_type' => 'sale',
                'condition' => 'like_new',
                'is_featured' => true,
                'image' => 'https://picsum.photos/seed/arduino/400/500' // Gambar Arduino
            ],
        ];

        foreach ($items as $item) {
            Item::create(array_merge($item, [
                'slug' => \Illuminate\Support\Str::slug($item['name']) . '-' . \Illuminate\Support\Str::random(4),
                'status' => 'available',
                'is_available' => true,
            ]));
        }
    }
}