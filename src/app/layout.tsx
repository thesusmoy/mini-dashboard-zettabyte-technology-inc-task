'use client';

import React from 'react';
import './globals.css';
import Sidebar from '../components/Sidebar';

// import AuthProvider from '../components/AuthProvider';
// import dynamic from 'next/dynamic';
// const AuthButtons = dynamic(() => import('../components/AuthButtons'), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-gray-50">
                {/* <AuthProvider> */}
                <div className="flex flex-col md:flex-row min-h-screen pb-12 md:pb-0">
                    <Sidebar />
                    <main className="flex-1 p-4 sm:p-6 w-full pt-12 md:pt-0">
                        <div className="flex justify-end mb-4">{/* <AuthButtons /> */}</div>
                        {children}
                    </main>
                </div>
                {/* </AuthProvider> */}
            </body>
        </html>
    );
}
