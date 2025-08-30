<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('items', function (Blueprint $table) {
            $table->decimal('deposit_amount', 12, 2)->nullable()->after('rental_price_per_day');
            $table->string('location')->nullable()->after('availability_type');
            $table->boolean('is_available')->default(true)->after('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('items', function (Blueprint $table) {
            $table->dropColumn(['deposit_amount', 'location', 'is_available']);
        });
    }
};
