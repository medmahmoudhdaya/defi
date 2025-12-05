<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SimulationAction extends Model
{
    use HasFactory;

    protected $fillable = [
        'simulation_id',
        'action_id',
        'user_id',
        'params',
        'delta',
        'applied_at',
    ];

    protected $casts = [
        'params' => 'array',
        'delta' => 'array',
        'applied_at' => 'datetime',
    ];

    public function simulation()
    {
        return $this->belongsTo(Simulation::class);
    }

    public function action()
    {
        return $this->belongsTo(Action::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
