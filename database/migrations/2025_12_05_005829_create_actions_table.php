<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('actions', function (Blueprint $table) {
            $table->id();

            $table->string('key')->unique(); // e.g., 'switch_to_led', 'teleconsultation'
            $table->string('name');
            $table->string('category'); // energy, waste, procurement...

            // Cost estimate (for score calculation)
            $table->decimal('cost_estimate', 12, 2)->default(0);

            // JSON describing formulas, coefficients, parameters
            // Example: { "co2_reduction": 0.12, "energy_saving": 15 }
            $table->json('impact_formula')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('actions');
    }
};
