<?php

namespace App\Http\Controllers;

use App\Models\Simulation;
use Inertia\Inertia;

class KpiController extends Controller
{
    public function index(Simulation $simulation)
    {
        return [
            'kpis' => $simulation->kpis()->get(),
        ];
    }
}
