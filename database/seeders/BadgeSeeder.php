<?php

namespace Database\Seeders;

use App\Models\Badge;
use Illuminate\Database\Seeder;

class BadgeSeeder extends Seeder
{
    public function run()
    {
        $badges = [
            ['name' => 'Energy Saver', 'description' => 'Reduce energy usage by 20%', 'icon' => 'zap'],
            ['name' => 'Waste Warrior', 'description' => 'Reduce waste by 30%', 'icon' => 'leaf'],
            ['name' => 'CO₂ Fighter', 'description' => 'Cut carbon emissions by 25%', 'icon' => 'wind'],
            ['name' => 'Eco Leader', 'description' => 'Complete 5 eco-actions', 'icon' => 'medal'],
            ['name' => 'Sustainability Champion', 'description' => 'Reach all KPI targets', 'icon' => 'trophy'],
        ];

        foreach ($badges as $badge) {
            Badge::create($badge);
        }
    }
}

