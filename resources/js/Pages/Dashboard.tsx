import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import {FormEvent} from "react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Dashboard() {
    const { data, setData, post, processing, reset, errors }  = useForm({
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
                    Todos
                </h2>
            }
        >
            <Head title="Todos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <form onSubmit={(e) => submit(e)}>
                    <textarea
                        value={data.title}
                        placeholder="Type the todo title"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('title', e.target.value)}
                    ></textarea>
                        <InputError message={errors.title} className="mt-2"/>
                        <PrimaryButton className="mt-4" disabled={processing}>Save</PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
