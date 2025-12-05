<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use App\Http\Controllers\{
    HospitalController,
    ActionController,
    SimulationController,
    SimulationActionController,
    BadgeController,
    KpiController
};
use App\Models\Action;
use App\Models\Simulation;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
    $simulation = Simulation::with(['hospital'])->latest()->first();

    return Inertia::render('dashboard', [
        'simulation' => $simulation,
        'actions'    => Action::all(),
        'kpis'       => $simulation?->kpis ?: [],
        'history'    => $simulation?->actions()->with('action')->get() ?: [],
    ]);

    })->name('dashboard');
});



Route::middleware(['auth'])->group(function () {

    // Hospitals list
    Route::get('/hospitals', [HospitalController::class, 'index'])
        ->name('hospitals.index');

    // Create simulation
    Route::post('/hospitals/{hospital}/simulations', [SimulationController::class, 'create'])
        ->name('simulations.create');

        Route::get('/simulations', [SimulationController::class, 'index'])
    ->name('simulations.index');
    // Show simulation dashboard
    Route::get('/simulations/{simulation}', [SimulationController::class, 'show'])
        ->name('simulations.show');

    // Actions list
    Route::get('/actions', [ActionController::class, 'index'])
        ->name('actions.index');

    // Apply action to simulation
    Route::post('/simulations/{simulation}/actions/{action}', 
        [SimulationActionController::class, 'apply'])
        ->name('simulations.applyAction');

    // KPIs
    Route::get('/simulations/{simulation}/kpis', [KpiController::class, 'index'])
        ->name('kpis.index');

    // Badges
    Route::get('/badges', [BadgeController::class, 'index'])
        ->name('badges.index');
});

require __DIR__.'/settings.php';

