<?php

namespace Database\Seeders;

use App\Models\Hospital;
use Illuminate\Database\Seeder;

class HospitalSeeder extends Seeder
{
    public function run(): void
    {
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
    }
}

