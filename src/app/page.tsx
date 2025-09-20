'use client';
import { useEffect } from 'react';

// Simple spinner component
function Spinner() {
    return (
        <span
            className="inline-block w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin align-middle"
            aria-label="Loading"
        />
    );
}
import BigChart from '../components/BigChart';
import PieChart from '../components/PieChart';

import React from 'react';
import useFetch from '../hooks/useFetch';
import SparkLine from '../components/SparkLine';
import Card from '../components/Card';

import Link from 'next/link';
// import { useSession } from 'next-auth/react';

export default function HomePage() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Styled console message
            console.log(
                '%cWelcome to the Mini Dashboard!',
                'color: #fff; background: linear-gradient(90deg,#6366f1,#10b981); font-size: 1.5rem; font-weight: bold; padding: 16px 32px; border-radius: 8px; box-shadow: 0 2px 8px rgba(99,102,241,0.15);'
            );
            console.log('%cBuilt by Susmoy Debnath', 'color: #6366f1; font-size: 1.1rem; font-weight: 500;');
        }
    }, []);
    // Mock endpoints for posts and users (replace with real API if available)
    const { data: posts, loading: postsLoading } = useFetch<{ id: number }[]>(
        'https://jsonplaceholder.typicode.com/posts'
    );
    const { data: users, loading: usersLoading } = useFetch<{ id: number }[]>(
        'https://jsonplaceholder.typicode.com/users'
    );
    // const { data: session, status } = useSession();

    // if (status === 'loading') return <div>Loading...</div>;
    // if (!session) {
    //     return (
    //         <div className="flex justify-center items-center h-full text-lg">Please sign in to view the dashboard.</div>
    //     );
    // }

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    {/* <h1 className="text-2xl font-bold">Welcome, {session.user?.name || 'User'}</h1> */}
                    <h1 className="text-2xl font-bold">Welcome, Susmoy</h1>

                    <p className="text-sm text-gray-500">Demo UI</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card title="Summary">
                        <div className="text-sm text-gray-600">Placeholder stats</div>
                        <div className="mt-4 flex gap-4">
                            <div className="text-center">
                                <div className="text-xl font-bold min-h-[1.5em] flex items-center justify-center">
                                    {postsLoading ? <Spinner /> : posts?.length ?? 0}
                                </div>
                                <div className="text-xs text-gray-500">Posts</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xl font-bold min-h-[1.5em] flex items-center justify-center">
                                    {usersLoading ? <Spinner /> : users?.length ?? 0}
                                </div>
                                <div className="text-xs text-gray-500">Users</div>
                            </div>
                        </div>
                    </Card>

                    <Card title="Animated Spark">
                        <div className="h-24 flex items-center">
                            <SparkLine />
                        </div>
                    </Card>

                    <Card title="Quick Links">
                        <div className="space-y-2 text-sm">
                            <Link href="/posts" className="block text-blue-600">
                                Posts
                            </Link>
                            <Link href="/users" className="block text-blue-600">
                                Users
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
            <div className="mt-8 flex flex-col md:flex-row gap-6 items-start w-full">
                <div
                    className="w-full md:w-1/3 bg-white rounded-lg p-4 shadow-sm mb-4 md:mb-0 flex items-center justify-center"
                    style={{ minHeight: 340 }}
                >
                    <PieChart height={120} />
                </div>
                <div
                    className="w-full md:w-1/3 bg-white rounded-lg p-4 shadow-sm flex items-center justify-center"
                    style={{ minHeight: 340 }}
                >
                    <BigChart height={320} />
                </div>
            </div>
        </>
    );
}
