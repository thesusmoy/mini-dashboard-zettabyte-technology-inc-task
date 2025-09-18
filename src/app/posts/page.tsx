'use client';
import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Card from '../../components/Card';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Post = { id: number; title: string; body: string; userId: number };

export default function PostsPage() {
    const [simulateError, setSimulateError] = useState(false);
    const { data, loading, error } = useFetch<Post[]>(process.env.NEXT_PUBLIC_URL + '/posts', { simulateError });

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Posts</h2>
                <div className="flex gap-2">
                    <button onClick={() => setSimulateError((s) => !s)} className="px-3 py-1 border rounded-md text-sm">
                        {simulateError ? 'Turn off error' : 'Simulate Error'}
                    </button>
                </div>
            </div>

            {loading && <div>Loading posts...</div>}
            {error && <div className="text-red-600">Failed to load posts: {error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <AnimatePresence>
                    {data?.slice(0, 12).map((p, i) => (
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
