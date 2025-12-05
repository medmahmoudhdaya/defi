<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\{
    Hospital,
    Action,
    Badge,
    Simulation,
    SimulationAction,
    Kpi,
    User
};

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // -----------------------------------------------------
        // CREATE ADMIN USER
        // -----------------------------------------------------
        $user = User::first() ?? User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);

        // -----------------------------------------------------
        // HOSPITALS
        // -----------------------------------------------------
        $hospitals = [
            ['name' => 'Saint-Louis General Hospital', 'beds' => 320, 'region' => 'Saint-Louis'],
            ['name' => 'Nouakchott National Hospital', 'beds' => 540, 'region' => 'Nouakchott'],
            ['name' => 'Kiffa Regional Medical Center', 'beds' => 180, 'region' => 'Kiffa'],
            ['name' => 'Aleg Community Hospital', 'beds' => 95, 'region' => 'Aleg'],
            ['name' => 'Rosso District Hospital', 'beds' => 210, 'region' => 'Rosso'],
            ['name' => 'Atar University Hospital', 'beds' => 260, 'region' => 'Atar'],
            ['name' => 'Zoueratt Mining Hospital', 'beds' => 150, 'region' => 'Zoueratt'],
            ['name' => 'Boghe Central Health Center', 'beds' => 120, 'region' => 'Boghe'],
            ['name' => 'Selibaby Referral Hospital', 'beds' => 200, 'region' => 'Selibaby'],
            ['name' => 'Tidjikja Wellness Hospital', 'beds' => 70, 'region' => 'Tidjikja'],
        ];

        foreach ($hospitals as $h) {
            Hospital::create($h);
        }

        // -----------------------------------------------------
        // ACTIONS
        // -----------------------------------------------------
        $actionsData = [
            [
                'key' => 'led_upgrade',
                'name' => 'LED Lighting Upgrade',
                'category' => 'energy',
                'cost_estimate' => 12000,
                'impact_formula' => ['energy' => -15, 'co2' => -8]
            ],
            [
                'key' => 'solar_installation',
                'name' => 'Solar Panel Installation',
                'category' => 'energy',
                'cost_estimate' => 55000,
                'impact_formula' => ['energy' => -35, 'co2' => -24]
            ],
            [
                'key' => 'waste_sorting',
                'name' => 'Waste Sorting Program',
                'category' => 'waste',
                'cost_estimate' => 5000,
                'impact_formula' => ['waste' => -30, 'co2' => -2]
            ],
            [
                'key' => 'water_optimization',
                'name' => 'Water Consumption Optimization',
                'category' => 'water',
                'cost_estimate' => 8000,
                'impact_formula' => ['water' => -25, 'energy' => -5]
            ],
            [
                'key' => 'hvac_maintenance',
                'name' => 'HVAC Efficiency Maintenance',
                'category' => 'operations',
                'cost_estimate' => 11000,
                'impact_formula' => ['energy' => -12, 'co2' => -7]
            ],
            [
                'key' => 'digitalization',
                'name' => 'Medical Digitalization',
                'category' => 'operations',
                'cost_estimate' => 20000,
                'impact_formula' => ['waste' => -15, 'co2' => -4]
            ],
            [
                'key' => 'staff_training',
                'name' => 'Staff Eco-Training Program',
                'category' => 'operations',
                'cost_estimate' => 4000,
                'impact_formula' => ['energy' => -3, 'waste' => -10]
            ],
            [
                'key' => 'biohazard_management',
                'name' => 'Biohazard Waste Optimization',
                'category' => 'waste',
                'cost_estimate' => 9000,
                'impact_formula' => ['waste' => -22]
            ]
        ];

        foreach ($actionsData as $a) {
            Action::create($a);
        }

        $actions = Action::all();

        // -----------------------------------------------------
        // BADGES (with required key field)
        // -----------------------------------------------------
        $badges = [
            ['key' => 'energy_saver', 'name' => 'Energy Saver', 'description' => 'Reduce energy usage by 20%', 'icon' => 'zap'],
            ['key' => 'waste_warrior', 'name' => 'Waste Warrior', 'description' => 'Reduce waste by 30%', 'icon' => 'leaf'],
            ['key' => 'co2_fighter', 'name' => 'CO₂ Fighter', 'description' => 'Cut carbon emissions by 25%', 'icon' => 'wind'],
            ['key' => 'eco_leader', 'name' => 'Eco Leader', 'description' => 'Complete 5 eco-actions', 'icon' => 'medal'],
            ['key' => 'sustainability_champion', 'name' => 'Sustainability Champion', 'description' => 'Reach all KPI targets', 'icon' => 'trophy'],
        ];

        foreach ($badges as $b) {
            Badge::create($b);
        }

        // -----------------------------------------------------
        // SIMULATIONS + KPIs + HISTORY (fixed status values)
        // -----------------------------------------------------
        $validStatuses = ['running', 'completed', 'abandoned'];

        foreach (Hospital::all() as $hospital) {

            $simulation = Simulation::create([
                'hospital_id' => $hospital->id,
                'status' => fake()->randomElement($validStatuses), // FIXED
                'started_by' => $user->id,
                'config' => [
                    'difficulty' => fake()->randomElement(['easy', 'medium', 'hard']),
                    'objectives' => ['Reduce CO₂', 'Improve Energy Efficiency']
                ],
            ]);

            // KPIs
            Kpi::create(['simulation_id' => $simulation->id, 'metric' => 'co2', 'value' => fake()->numberBetween(40, 150)]);
            Kpi::create(['simulation_id' => $simulation->id, 'metric' => 'energy', 'value' => fake()->numberBetween(60, 200)]);
            Kpi::create(['simulation_id' => $simulation->id, 'metric' => 'waste', 'value' => fake()->numberBetween(10, 100)]);

            // History
            foreach ($actions->random(rand(3, 7)) as $action) {
                SimulationAction::create([
                    'simulation_id' => $simulation->id,
                    'action_id' => $action->id,
                    'user_id' => $user->id,
                    'delta' => $action->impact_formula,
                    'applied_at' => now()->subHours(rand(1, 72)),
                ]);
            }
        }
    }
}
