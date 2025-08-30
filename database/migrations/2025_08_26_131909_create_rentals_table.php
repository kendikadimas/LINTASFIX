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
        Schema::create('rentals', function (Blueprint $table) {
        $table->id();
        $table->string('rental_number')->unique();
        $table->foreignId('item_id')->constrained()->onDelete('cascade');
        $table->foreignId('renter_id')->constrained('users')->onDelete('cascade');
        $table->foreignId('owner_id')->constrained('users')->onDelete('cascade');
        $table->date('start_date');
        $table->date('end_date');
        $table->decimal('daily_rate', 10, 2);
        $table->integer('total_days');
        $table->decimal('deposit_amount', 10, 2)->default(0);
        $table->decimal('total_amount', 10, 2);
        $table->enum('status', ['pending_payment', 'confirmed', 'ongoing', 'returned', 'cancelled', 'overdue'])->default('pending_payment');
        $table->string('payment_method');
        $table->string('delivery_method');
        $table->string('delivery_address')->nullable();
        $table->text('notes')->nullable();
        $table->timestamp('actual_return_date')->nullable();
        $table->text('return_notes')->nullable();
        $table->decimal('late_fee', 10, 2)->default(0);
        $table->decimal('damage_fee', 10, 2)->default(0);
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rentals');
    }
};
