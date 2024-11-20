<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TodoController extends Controller
{
    /**
     *  Display todos root
     */
    public function index(): Response
    {
        return Inertia::render('Dashboard');
    }

    /**
     *  Create a todo
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255'
        ]);
        $request->user()->todos()->create($validated);

        return redirect(route('todos.index'));
    }
}
