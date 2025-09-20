// Mobile top app name bar
function MobileAppBar() {
    return (
        <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-white border-b border-indigo-100 shadow flex items-center h-12 px-4">
            <span className="font-extrabold text-xl tracking-tight text-gray-700">Dash_</span>
        </div>
    );
}

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    HiOutlineMenu,
    HiOutlineX,
    HiOutlineHome,
    HiOutlineDocumentText,
    HiOutlineUser,
    HiOutlineCog,
} from 'react-icons/hi';
import { usePathname } from 'next/navigation';

const items = [
    { href: '/', label: 'Dashboard', icon: <HiOutlineHome className="w-6 h-6" /> },
    { href: '/posts', label: 'Posts', icon: <HiOutlineDocumentText className="w-6 h-6" /> },
    { href: '/users', label: 'Users', icon: <HiOutlineUser className="w-6 h-6" /> },
    { href: '/settings', label: 'Settings', icon: <HiOutlineCog className="w-6 h-6" /> },
];

export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const pathname = usePathname();

    // Desktop sidebar
    const desktopSidebar = (
        <aside className="hidden md:flex">
            <motion.div
                animate={{ width: open ? 220 : 64 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="h-screen bg-gradient-to-b from-indigo-50 via-white to-blue-50 shadow-lg overflow-hidden border-r border-indigo-100"
            >
                <div className="flex text-gray-700 items-center justify-between p-4 border-b border-indigo-100">
                    <span className={`font-extrabold text-xl tracking-tight ${!open && 'truncate hidden'}`}>Dash_</span>
                    <button
                        onClick={() => setOpen((v) => !v)}
                        aria-label="toggle"
                        className="text-gray-700 hover:text-gray-700"
                    >
                        {open ? <HiOutlineX /> : <HiOutlineMenu />}
                    </button>
                </div>
                <nav className="mt-6 text-gray-700">
                    {items.map((i) => {
                        const active = pathname === i.href;
                        return (
                            <Link key={i.href} href={i.href} className="block group">
                                <div
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg my-1 transition-all duration-200 cursor-pointer
                                        ${active ? 'bg-indigo-100 font-bold shadow-sm' : 'hover:bg-indigo-50'}`}
                                >
                                    <span className="text-xl">{i.icon}</span>
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: open ? 1 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`ml-2 text-base ${open ? 'block' : 'hidden'}`}
                                    >
                                        {i.label}
                                    </motion.span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </motion.div>
            <div style={{ width: open ? 0 : 8 }} />
        </aside>
    );

    // Mobile bottom nav
    const mobileSidebar = (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden bg-white border-t border-indigo-100 shadow-lg justify-around py-1">
            {items.map((i) => {
                const active = pathname === i.href;
                return (
                    <Link
                        key={i.href}
                        href={i.href}
                        className="flex flex-col items-center justify-center flex-1 group py-1"
                    >
                        <span
                            className={`text-2xl ${
                                active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-500'
                            }`}
                        >
                            {i.icon}
                        </span>
                        <span
                            className={`text-xs mt-0.5 ${active ? 'text-indigo-600 font-semibold' : 'text-gray-500'}`}
                        >
                            {i.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            <MobileAppBar />
            {desktopSidebar}
            {mobileSidebar}
        </>
    );
}
