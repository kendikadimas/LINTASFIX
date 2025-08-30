<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB; // <-- Jangan lupa import DB

return new class extends Migration
{
    public function up(): void
    {
        // Menambahkan 'like_new' ke dalam daftar ENUM yang diizinkan
        DB::statement("ALTER TABLE items MODIFY COLUMN `condition` ENUM('excellent', 'good', 'fair', 'poor', 'like_new') NOT NULL");
    }

    public function down(): void
    {
        // Mengembalikan ke kondisi semula jika migrasi di-rollback
        DB::statement("ALTER TABLE items MODIFY COLUMN `condition` ENUM('excellent', 'good', 'fair', 'poor') NOT NULL");
    }
};