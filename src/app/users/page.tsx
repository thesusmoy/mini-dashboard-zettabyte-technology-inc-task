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
    function exportUsersToCSV(users: User[]) {
        if (!users?.length) return;
        const header = ['Name', 'Email', 'Company'];
        const rows = users.map((u) => [
            '"' + u.name.replace(/"/g, '""') + '"',
            '"' + u.email.replace(/"/g, '""') + '"',
            '"' + (u.company?.name?.replace(/"/g, '""') || '') + '"',
        ]);
        const csv = [header, ...rows].map((r) => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                <h2 className="text-xl font-bold">Users</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border px-2 py-1 rounded-md text-sm"
                    />
                    <button
                        onClick={() => exportUsersToCSV(filtered || [])}
                        className="px-3 py-1 rounded bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition-colors text-sm shadow"
                        disabled={!filtered?.length}
                        title="Export filtered users as CSV"
                    >
                        Export CSV
                    </button>
                </div>
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
                    <table className="w-full text-left rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-3 px-4 font-semibold text-black">Name</th>
                                <th className="py-3 px-4 font-semibold text-black">Email</th>
                                <th className="py-3 px-4 font-semibold text-black">Company</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered?.map((u, idx) => (
                                <tr
                                    key={u.id}
                                    onClick={() => setSelected(u)}
                                    className={`cursor-pointer transition-colors duration-150 ${
                                        idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                    } hover:bg-indigo-50`}
                                >
                                    <td className="py-3 px-4 font-medium text-gray-800">{u.name}</td>
                                    <td className="py-3 px-4 text-gray-600">{u.email}</td>
                                    <td className="py-3 px-4 text-gray-600">{u.company?.name}</td>
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
