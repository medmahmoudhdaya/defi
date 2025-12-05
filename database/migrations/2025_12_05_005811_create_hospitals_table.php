<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('hospitals', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('beds')->default(100);
            $table->string('region')->nullable();

            // Example: { "electricity": 0.55, "gas": 0.35, "solar": 0.10 }
            $table->json('baseline_energy_mix')->nullable();

            // Baseline CO₂ per year (kg)
            $table->float('baseline_emissions')->default(0);

            $table->integer('capacity')->default(300);
            $table->integer('efficiency')->default(75); // percentage

            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('hospitals');
    }
};
