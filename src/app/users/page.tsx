'use client';
import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Card from '../../components/Card';
import Modal from '../../components/Modal';

type User = {
    id: number;
    name: string;
    email: string;
    company: { name: string };
    phone: string;
    website: string;
};

export default function UsersPage() {
    const { data, loading, error } = useFetch<User[]>(process.env.NEXT_PUBLIC_URL + '/users');
    const [selected, setSelected] = useState<User | null>(null);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Users</h2>
            {loading && <div>Loading users...</div>}
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
                            {data?.map((u) => (
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
