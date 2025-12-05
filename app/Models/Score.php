<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Score extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'simulation_id',
        'points',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function simulation()
    {
        return $this->belongsTo(Simulation::class);
    }
}
