<?php

namespace App\Http\Controllers;

use App\Models\Badge;
use Inertia\Inertia;

class BadgeController extends Controller
{
    public function index()
    {
        return Inertia::render('Badges/Index', [
            'badges' => Badge::all(),
        ]);
    }
}
