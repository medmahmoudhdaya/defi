<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('simulations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('hospital_id')->constrained()->cascadeOnDelete();
            $table->foreignId('started_by')->constrained('users')->cascadeOnDelete();

            // Stores simulation settings (e.g., difficulty, scenarios enabled)
            $table->json('config')->nullable();

            $table->enum('status', ['running', 'completed', 'abandoned'])
                  ->default('running');

            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('simulations');
    }
};
