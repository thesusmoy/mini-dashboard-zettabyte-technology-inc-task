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
    // On mobile, show all posts (no pagination); on desktop, paginate
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const paginated = isMobile ? filtered : filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <h2 className="text-xl font-bold">Posts</h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="border px-2 py-1 rounded-md text-sm w-full sm:w-auto"
                    />
                    <button
                        onClick={() => setSimulateError((s) => !s)}
                        className="px-3 py-1 border rounded-md text-sm w-full sm:w-auto"
                    >
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

            <AnimatePresence mode="wait">
                <motion.div
                    key={isMobile ? 'all' : page}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.35 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4"
                >
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
                </motion.div>
            </AnimatePresence>

            {/* Pagination Controls (desktop only) */}
            {!isMobile && totalPages > 1 && (
                <div className="hidden sm:flex justify-center items-center gap-2 mt-8 overflow-x-auto w-full flex-nowrap pl-2">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-1 rounded bg-gray-100 text-gray-600 disabled:opacity-50 min-w-[60px] flex-shrink-0"
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1 rounded font-semibold min-w-[40px] flex-shrink-0 ${
                                page === i + 1 ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-3 py-1 rounded bg-gray-100 text-gray-600 disabled:opacity-50 min-w-[60px] flex-shrink-0"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
