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
        Schema::table('users', function (Blueprint $table) {
            $table->string('student_id')->unique()->nullable();
            $table->string('university')->nullable();
            $table->string('faculty')->nullable();
            $table->string('major')->nullable();
            $table->string('semester')->nullable();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->string('avatar')->nullable();
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('rating_count')->default(0);
            $table->boolean('is_verified')->default(false);
            $table->timestamp('verified_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'student_id', 'university', 'faculty', 'major', 'semester',
                'phone', 'address', 'avatar', 'rating', 'rating_count',
                'is_verified', 'verified_at'
            ]);
        });
    }
};
