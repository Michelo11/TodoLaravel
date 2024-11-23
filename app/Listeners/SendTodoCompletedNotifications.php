<?php

namespace App\Listeners;

use App\Models\User;
use App\Events\TodoCompleted;
use App\Notifications\CompletedTodo;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendTodoCompletedNotifications implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(TodoCompleted $event): void
    {
        if ($event->todo->completed) {
            User::where('id', $event->todo->user_id)->first()->notify(new CompletedTodo($event->todo));
        }
    }
}
