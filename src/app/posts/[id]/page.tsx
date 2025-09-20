'use client';
import React, { use } from 'react';
// import { useRouter } from 'next/navigation';
import useFetch from '../../../hooks/useFetch';
import Card from '../../../components/Card';

type Post = { id: number; title: string; body: string; userId: number };

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data, loading, error } = useFetch<Post>(process.env.NEXT_PUBLIC_API_URL + `/posts/${id}`);

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Post Details</h2>
            </div>

            {loading && <div>Loading post...</div>}
            {error && <div className="text-red-600">Failed to load post: {error}</div>}
            {data && (
                <Card>
                    <h3 className="text-lg font-semibold">{data.title}</h3>
                    <p className="mt-3 text-gray-700">{data.body}</p>
                    <div className="mt-4 text-sm text-gray-500">User ID: {data.userId}</div>
                </Card>
            )}
        </div>
    );
}
