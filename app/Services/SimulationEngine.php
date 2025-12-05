<?php

namespace App\Services;

use App\Models\Simulation;
use App\Models\Action;

class SimulationEngine
{
    public function applyAction(Simulation $simulation, Action $action, array $params = [])
    {
        // Example formulas — opinionated defaults
        $formula = $action->impact_formula ?? [];

        $delta = [
            'co2' => $formula['co2_reduction'] ?? 0,
            'energy' => $formula['energy_saving_kwh'] ?? 0,
            'waste_reduction' => $formula['waste_reduction_percent'] ?? 0,
        ];

        // You will later update KPIs here
        // e.g. $simulation->kpis()->create(...)

        return $delta;
    }
}
