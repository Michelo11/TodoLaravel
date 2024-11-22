<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class TodoController extends Controller
{
    /**
     *  Display todos root
     */
    public function index(): Response
    {
        return Inertia::render('Dashboard', [
            'todos' => Todo::with('user:id,name')->latest()->get()
        ]);
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

    /**
     *  Update a todo
     */
    public function update(Request $request, Todo $todo): RedirectResponse
    {
        Gate::authorize('update', $todo);

        $validated = $request->validate([
            'completed' => 'required|boolean'
        ]);
        $todo->update($validated);

        return redirect(route('todos.index'));
    }

    /**
     *  Delete a todo
     */
    public function destroy(Todo $todo): RedirectResponse
    {
        Gate::authorize('delete', $todo);

        $todo->delete();

        return redirect(route('todos.index'));
    }
}
