'use client';
// Simple spinner component
function Spinner() {
    return (
        <span
            className="inline-block w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin align-middle"
            aria-label="Loading"
        />
    );
}
import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Card from '../../components/Card';
import Modal from '../../components/Modal';
import useDebounce from '../../hooks/useDebounce';

import type { User } from '../../types/entities';

export default function UsersPage() {
    const { data, loading, error } = useFetch<User[]>(process.env.NEXT_PUBLIC_API_URL + '/users');
    const [selected, setSelected] = useState<User | null>(null);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);

    const filtered = data?.filter(
        (u) =>
            u.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            u.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            u.company?.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Users</h2>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-2 py-1 rounded-md text-sm"
                />
            </div>
            {loading && (
                <div className="flex justify-center items-center py-8">
                    <Spinner />
                    <span className="ml-2 text-gray-500">Loading users...</span>
                </div>
            )}
            {error && <div className="text-red-600">Failed to load users: {error}</div>}

            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="py-2">Name</th>
                                <th className="py-2">Email</th>
                                <th className="py-2">Company</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered?.map((u) => (
                                <tr
                                    key={u.id}
                                    onClick={() => setSelected(u)}
                                    className="cursor-pointer hover:bg-gray-50"
                                >
                                    <td className="py-2">{u.name}</td>
                                    <td className="py-2">{u.email}</td>
                                    <td className="py-2">{u.company?.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
                {selected && (
                    <div>
                        <h3 className="text-lg font-bold">{selected.name}</h3>
                        <p className="text-sm text-gray-600">{selected.email}</p>
                        <p className="mt-2">{selected.company?.name}</p>
                        <p className="text-sm text-gray-500 mt-2">Phone: {selected.phone}</p>
                        <p className="text-sm text-gray-500">Website: {selected.website}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
}
