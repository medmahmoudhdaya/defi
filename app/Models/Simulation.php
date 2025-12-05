<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Simulation extends Model
{
    use HasFactory;

    protected $fillable = [
        'hospital_id',
        'started_by',
        'config',
        'status',
    ];

    protected $casts = [
        'config' => 'array',
    ];

    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'started_by');
    }

    public function actions()
    {
        return $this->hasMany(SimulationAction::class);
    }

    public function kpis()
    {
        return $this->hasMany(Kpi::class);
    }

    public function scores()
    {
        return $this->hasMany(Score::class);
    }
}
