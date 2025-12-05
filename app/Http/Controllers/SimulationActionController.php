<?php

namespace App\Http\Controllers;

use App\Models\Simulation;
use App\Models\Action;
use App\Models\SimulationAction;
use App\Services\SimulationEngine;
use Illuminate\Http\Request;

class SimulationActionController extends Controller
{
    public function apply(Request $request, Simulation $simulation, Action $action)
    {
        $data = $request->validate([
            'params' => 'nullable|array',
        ]);

        $engine = new SimulationEngine();
        $delta = $engine->applyAction($simulation, $action, $data['params'] ?? []);

        SimulationAction::create([
            'simulation_id' => $simulation->id,
            'action_id'      => $action->id,
            'user_id'        => auth()->id(),
            'params'         => $data['params'] ?? [],
            'delta'          => $delta,
            'applied_at'     => now(),
        ]);

        return back();
    }
}
