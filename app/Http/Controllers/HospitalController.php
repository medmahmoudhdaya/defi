<?php

namespace App\Http\Controllers;

use App\Models\Hospital;
use Inertia\Inertia;

class HospitalController extends Controller
{
    public function index()
    {
        return Inertia::render('Hospitals/Index', [
            'hospitals' => Hospital::all(),
        ]);
    }
}
