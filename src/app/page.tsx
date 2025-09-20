'use client';

import React from 'react';
import Card from '../components/Card';
import { motion } from 'framer-motion';
import Link from 'next/link';
// import { useSession } from 'next-auth/react';

export default function HomePage() {
    const sparkValues = [20, 40, 25, 55, 35, 65];
    // const { data: session, status } = useSession();

    // if (status === 'loading') return <div>Loading...</div>;
    // if (!session) {
    //     return (
    //         <div className="flex justify-center items-center h-full text-lg">Please sign in to view the dashboard.</div>
    //     );
    // }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                {/* <h1 className="text-2xl font-bold">Welcome, {session.user?.name || 'User'}</h1> */}
                <h1 className="text-2xl font-bold">Welcome, Susmoy</h1>

                <p className="text-sm text-gray-500">Mini Dashboard demo</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card title="Summary">
                    <div className="text-sm text-gray-600">Placeholder stats</div>
                    <div className="mt-4 flex gap-4">
                        <div className="text-center">
                            <div className="text-xl font-bold">128</div>
                            <div className="text-xs text-gray-500">Active</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-bold">32</div>
                            <div className="text-xs text-gray-500">New</div>
                        </div>
                    </div>
                </Card>

                <Card title="Animated Spark">
                    <div className="h-24 flex items-end">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.08 } },
                            }}
                            className="w-full flex items-end space-x-2"
                        >
                            {sparkValues.map((v, i) => (
                                <motion.div
                                    key={i}
                                    variants={{ hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                                    transition={{ type: 'spring', stiffness: 150, damping: 16 }}
                                    className="flex-1"
                                    style={{ height: `${v}%` }}
                                >
                                    <div className="bg-indigo-500 rounded-t h-full" />
                                </motion.div>
                            ))}
                        </motion.div>
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
    );
}
