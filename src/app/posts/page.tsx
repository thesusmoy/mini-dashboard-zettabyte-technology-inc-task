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
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import useDebounce from '../../hooks/useDebounce';

import type { Post } from '../../types/entities';

export default function PostsPage() {
    const [simulateError, setSimulateError] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const perPage = 8;
    const debouncedSearch = useDebounce(search, 300);
    const { data, loading, error } = useFetch<Post[]>(process.env.NEXT_PUBLIC_API_URL + '/posts', { simulateError });

    const filtered =
        data?.filter(
            (p) =>
                p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                p.body.toLowerCase().includes(debouncedSearch.toLowerCase())
        ) || [];

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Posts</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="border px-2 py-1 rounded-md text-sm"
                    />
                    <button onClick={() => setSimulateError((s) => !s)} className="px-3 py-1 border rounded-md text-sm">
                        {simulateError ? 'Turn off error' : 'Simulate Error'}
                    </button>
                </div>
            </div>

            {loading && (
                <div className="flex justify-center items-center py-8">
                    <Spinner />
                    <span className="ml-2 text-gray-500">Loading posts...</span>
                </div>
            )}
            {error && <div className="text-red-600">Failed to load posts: {error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <AnimatePresence>
                    {paginated.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 24, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -16, scale: 0.96 }}
                            transition={{ duration: 0.35, delay: i * 0.08 }}
                        >
                            <Link href={`/posts/${p.id}`}>
                                <Card className="hover:shadow-lg transition-shadow duration-200">
                                    <h3 className="font-extrabold text-lg text-black mb-2 transition-colors duration-200 group-hover:text-indigo-700">
                                        {p.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">{p.body}</p>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-1 rounded bg-gray-100 text-gray-600 disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1 rounded font-semibold ${
                                page === i + 1 ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-3 py-1 rounded bg-gray-100 text-gray-600 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
