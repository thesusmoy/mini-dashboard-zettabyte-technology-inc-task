'use client';
import React from 'react';
import './globals.css';
import Sidebar from '../components/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-gray-50">
                <div className="flex">
                    <Sidebar />
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </body>
        </html>
    );
}
