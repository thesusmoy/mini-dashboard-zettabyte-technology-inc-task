'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const items = [
    { href: '/', label: 'Dashboard' },
    { href: '/posts', label: 'Posts' },
    { href: '/users', label: 'Users' },
];

const imgs = [
    { href: '/images/file.svg', atl: '' },
    { href: '/images/file.svg', atl: '' },
    { href: '/images/file.svg', atl: '' },
];

export default function Sidebar() {
    const [open, setOpen] = useState(true);

    return (
        <aside className="flex">
            <motion.div
                animate={{ width: open ? 220 : 64 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="h-screen bg-white shadow-md overflow-hidden"
            >
                <div className="flex text-black items-center justify-between p-4">
                    <span className={`font-bold text-lg ${!open && 'truncate hidden'}`}>Dashboard</span>
                    <button onClick={() => setOpen((v) => !v)} aria-label="toggle">
                        {open ? <HiOutlineX /> : <HiOutlineMenu />}
                    </button>
                </div>

                <nav className="mt-6 bg-gray-100 text-black">
                    {items.map((i) => (
                        <Link key={i.href} href={i.href} className="block">
                            <div className="px-4 py-3 hover:bg-blue-100">
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: open ? 1 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="ml-2"
                                >
                                    {i.label}
                                </motion.span>
                                {!open && <div className="text-center">•</div>}
                            </div>
                        </Link>
                    ))}
                </nav>
            </motion.div>
            {/* small spacer so main content doesn't get overlapped when collapsed */}
            <div style={{ width: open ? 0 : 8 }} />
        </aside>
    );
}
