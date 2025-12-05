<?php
namespace Database\Seeders;

use App\Models\Simulation;
use App\Models\SimulationAction;
use App\Models\Kpi;
use App\Models\Hospital;
use App\Models\Action;
use Illuminate\Database\Seeder;

class SimulationSeeder extends Seeder
{
    public function run()
    {
        $hospitals = Hospital::all();
        $actions = Action::all();

        foreach ($hospitals as $hospital) {
            $simulation = Simulation::create([
                'hospital_id' => $hospital->id,
                'status' => fake()->randomElement(['running', 'paused', 'completed']),
                'config' => [
                    'difficulty' => fake()->randomElement(['easy', 'medium', 'hard']),
                    'objectives' => ['Reduce CO2', 'Improve energy efficiency']
                ],
            ]);

            // KPIs
            Kpi::create(['simulation_id' => $simulation->id, 'metric' => 'co2', 'value' => fake()->numberBetween(20, 120)]);
            Kpi::create(['simulation_id' => $simulation->id, 'metric' => 'energy', 'value' => fake()->numberBetween(50, 150)]);
            Kpi::create(['simulation_id' => $simulation->id, 'metric' => 'waste', 'value' => fake()->numberBetween(10, 80)]);

            // 3–7 random actions applied
            $applied = $actions->random(rand(3, 7));

            foreach ($applied as $action) {
                SimulationAction::create([
                    'simulation_id' => $simulation->id,
                    'action_id' => $action->id,
                    'user_id' => 1, // or use a random user
                    'delta' => $action->impact_formula,
                    'applied_at' => now()->subHours(rand(1, 72)),
                ]);
            }
        }
    }
}

