<?php

namespace Database\Seeders;

use App\Models\Action;
use Illuminate\Database\Seeder;

class ActionSeeder extends Seeder
{
    public function run(): void
    {
        $actions = [
            [
                'key' => 'led_upgrade',
                'name' => 'LED Lighting Upgrade',
                'category' => 'energy',
                'cost_estimate' => 12000,
                'impact_formula' => [
                    'energy' => -15,
                    'co2' => -8,
                    'waste' => 0,
                ],
            ],
            [
                'key' => 'solar_installation',
                'name' => 'Solar Panel Installation',
                'category' => 'energy',
                'cost_estimate' => 55000,
                'impact_formula' => [
                    'energy' => -35,
                    'co2' => -24,
                ],
            ],
            [
                'key' => 'waste_sorting',
                'name' => 'Waste Sorting Program',
                'category' => 'waste',
                'cost_estimate' => 5000,
                'impact_formula' => [
                    'waste' => -30,
                    'co2' => -2,
                ],
            ],
            [
                'key' => 'water_optimization',
                'name' => 'Water Consumption Optimization',
                'category' => 'water',
                'cost_estimate' => 8000,
                'impact_formula' => [
                    'water' => -25,
                    'energy' => -5,
                ],
            ],
            [
                'key' => 'hvac_maintenance',
                'name' => 'HVAC Efficiency Maintenance',
                'category' => 'operations',
                'cost_estimate' => 11000,
                'impact_formula' => [
                    'energy' => -12,
                    'co2' => -7,
                ],
            ],
            [
                'key' => 'digitalization',
                'name' => 'Medical Digitalization',
                'category' => 'operations',
                'cost_estimate' => 20000,
                'impact_formula' => [
                    'waste' => -15,
                    'co2' => -4,
                ],
            ],
            [
                'key' => 'training_staff',
                'name' => 'Staff Eco-Training Program',
                'category' => 'operations',
                'cost_estimate' => 4000,
                'impact_formula' => [
                    'energy' => -3,
                    'waste' => -10,
                ],
            ],
            [
                'key' => 'biohazard_management',
                'name' => 'Biohazard Waste Optimization',
                'category' => 'waste',
                'cost_estimate' => 9000,
                'impact_formula' => [
                    'waste' => -22,
                ],
            ],
            [
                'key' => 'equipment_renewal',
                'name' => 'Renew Old Medical Equipment',
                'category' => 'energy',
                'cost_estimate' => 30000,
                'impact_formula' => [
                    'energy' => -18,
                    'co2' => -10,
                ],
            ]
        ];

        foreach ($actions as $a) {
            Action::create($a);
        }
    }
}

