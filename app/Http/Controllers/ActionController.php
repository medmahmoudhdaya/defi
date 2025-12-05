<?php

namespace App\Http\Controllers;

use App\Models\Action;
use Inertia\Inertia;

class ActionController extends Controller
{
    public function index()
    {
        return Inertia::render('Actions/Index', [
            'actions' => Action::all(),
        ]);
    }
}
