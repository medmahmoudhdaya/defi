<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Hospital extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'beds',
        'region',
        'baseline_energy_mix',
        'baseline_emissions',
        'capacity',
        'efficiency',
    ];

    protected $casts = [
        'baseline_energy_mix' => 'array',
    ];

    public function simulations()
    {
        return $this->hasMany(Simulation::class);
    }
}
