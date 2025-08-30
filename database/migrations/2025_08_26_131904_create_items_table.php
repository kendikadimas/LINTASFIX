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
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->decimal('rental_price_per_day', 10, 2)->nullable();
            $table->enum('condition', ['excellent', 'good', 'fair', 'poor']);
            $table->enum('availability_type', ['sale', 'rent', 'both']);
            $table->enum('status', ['available', 'rented', 'sold', 'maintenance']);
            $table->json('images')->nullable();
            $table->string('brand')->nullable();
            $table->string('model')->nullable();
            $table->year('year_purchased')->nullable();
            $table->integer('stock_quantity')->default(1);
            $table->text('notes')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index(['status', 'availability_type']);
            $table->index(['category_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
