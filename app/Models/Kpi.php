<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Kpi extends Model
{
    use HasFactory;

    protected $fillable = [
        'simulation_id',
        'metric',
        'value',
        'calculated_at',
    ];

    protected $casts = [
        'calculated_at' => 'datetime',
    ];

    public function simulation()
    {
        return $this->belongsTo(Simulation::class);
    }
}
