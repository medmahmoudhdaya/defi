<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('kpis', function (Blueprint $table) {
            $table->id();

            $table->foreignId('simulation_id')->constrained()->cascadeOnDelete();

            $table->string('metric'); // "co2", "energy", "water", "waste", etc.
            $table->double('value');

            $table->timestamp('calculated_at')->useCurrent();

            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('kpis');
    }
};
