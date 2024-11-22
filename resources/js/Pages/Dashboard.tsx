import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import {FormEvent} from "react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import {Transition} from "@headlessui/react";
import Todo from "@/Components/Todo";

export default function Dashboard({ todos} : { todos: any[] }) {
    const {data, setData, post, processing, reset, errors, recentlySuccessful} = useForm({
        title: ''
    });
    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('todos.store'), {
            onSuccess: () => reset()
        })
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    Todo
                                </h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Your personal list of things to do.
                                </p>
                            </header>

                            {todos.length === 0 && (
                                <p className="p-2 text-sm text-gray-600 dark:text-gray-400">
                                    No todos.
                                </p>
                            )}

                            {todos.map(todo =>
                                <Todo key={todo.id} todo={todo}/>
                            )}

                            <form onSubmit={(e) => submit(e)} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="title" value="Title"/>

                                    <TextInput
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        required
                                        isFocused
                                    />

                                    <InputError className="mt-2" message={errors.title}/>
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Saved.
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
);
}
