<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // === PENGGUNA JURUSAN TEKNIK ===

        User::factory()->create([
            'name' => 'Rina Suryani',
            'email' => 'rina.suryani@kampus.ac.id',
            'university' => 'Institut Teknologi Bandung',
            'major' => 'Teknik Informatika',
        ]);

        User::factory()->create([
            'name' => 'Bambang P.',
            'email' => 'bambang.p@kampus.ac.id',
            'university' => 'Universitas Gadjah Mada',
            'major' => 'Teknik Geologi',
        ]);

        User::factory()->create([
            'name' => 'Citra Lestari',
            'email' => 'citra.lestari@kampus.ac.id',
            'university' => 'Universitas Indonesia',
            'major' => 'Teknik Sipil',
        ]);

        User::factory()->create([
            'name' => 'Doni Irawan',
            'email' => 'doni.irawan@kampus.ac.id',
            'university' => 'Institut Teknologi Sepuluh Nopember',
            'major' => 'Teknik Industri',
        ]);
        
        User::factory()->create([
            'name' => 'Eka Wijaya',
            'email' => 'eka.wijaya@kampus.ac.id',
            'university' => 'Universitas Diponegoro',
            'major' => 'Teknik Elektro',
        ]);
        
        User::factory()->create([
            'name' => 'Faisal Amir',
            'email' => 'faisal.amir@kampus.ac.id',
            'university' => 'Universitas Brawijaya',
            'major' => 'Teknik Mesin',
        ]);

        User::factory()->create([
            'name' => 'Gilang Ramadhan',
            'email' => 'gilang.r@kampus.ac.id',
            'university' => 'Telkom University',
            'major' => 'Teknik Komputer',
        ]);

        // Menjalankan seeder untuk Kategori dan Item
        $this->call([
            CategorySeeder::class,
            ItemSeeder::class,
        ]);
    }
}