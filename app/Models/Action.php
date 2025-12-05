<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Action extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'name',
        'category',
        'cost_estimate',
        'impact_formula',
    ];

    protected $casts = [
        'impact_formula' => 'array',
    ];

    public function simulationActions()
    {
        return $this->hasMany(SimulationAction::class);
    }
}
