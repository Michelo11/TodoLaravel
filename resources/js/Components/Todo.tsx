import {Link, useForm} from "@inertiajs/react";
import {useEffect} from "react";

export default function Todo({ todo }: { todo: any }) {
    const { data, setData, patch } = useForm({
        completed: todo.completed
    })
    const submit = () => {
        patch(route("todos.update", todo.id))
    }

    useEffect(() => {
        if (data.completed === todo.completed) return;

        submit()
    }, [data]);

    return (
        <div className="p-2 flex justify-between items-center">
            <div className="flex gap-1 items-center">
                <input type="checkbox" className="bg-gray-900 rounded-md" checked={data.completed} onChange={(e) => {
                    setData("completed", e.target.checked)
                }}/>
                <p className="text-sm text-gray-600 dark:text-gray-400">{todo.title}</p>
            </div>

            <Link href={route('todos.destroy', todo.id)} method="delete" className="text-sm text-gray-600 dark:text-gray-400">
                Delete
            </Link>
        </div>
    );
}
