<?php

namespace App\Http\Controllers;

use App\Models\Simulation;
use App\Models\Hospital;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SimulationController extends Controller
{
    public function index()
    {
        return Inertia::render("Simulations/Index", [
            "simulations" => Simulation::with("hospital")->get()
        ]);
    }

    public function create(Hospital $hospital)
    {
        $simulation = Simulation::create([
            'hospital_id' => $hospital->id,
            'started_by'  => auth()->id(),
            'config'      => ['difficulty' => 'normal'],
            'status'      => 'running',
        ]);

        return redirect()->route('simulations.show', $simulation->id);
    }

    public function show(Simulation $simulation)
    {
        return Inertia::render('Simulations/Show', [
            'simulation' => $simulation->load(['hospital', 'actions.action', 'kpis']),
            'availableActions' => \App\Models\Action::all(),
        ]);
    }
}
