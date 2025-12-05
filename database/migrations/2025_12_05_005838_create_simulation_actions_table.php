<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('simulation_actions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('simulation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('action_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // Optional inputs to the action (e.g., % adoption, scale)
            $table->json('params')->nullable();

            // Computed deltas: { "co2": -120, "energy": -50, "cost": -2000 }
            $table->json('delta')->nullable();

            $table->timestamp('applied_at')->useCurrent();

            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('simulation_actions');
    }
};
