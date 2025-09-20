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
    const debouncedSearch = useDebounce(search, 300);
    const { data, loading, error } = useFetch<Post[]>(process.env.NEXT_PUBLIC_API_URL + '/posts', { simulateError });

    const filtered = data?.filter(
        (p) =>
            p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            p.body.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Posts</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <AnimatePresence>
                    {filtered?.slice(0, 12).map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ delay: i * 0.04 }}
                        >
                            <Link href={`/posts/${p.id}`}>
                                <Card title={p.title}>
                                    <p className="text-sm text-gray-600 line-clamp-2">{p.body}</p>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
