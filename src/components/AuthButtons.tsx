'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

export default function AuthButtons() {
    const { data: session, status } = useSession();

    if (status === 'loading') return <div>Loading...</div>;

    if (session) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-sm">{session.user?.name}</span>
                <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => signOut()}>
                    Sign out
                </button>
            </div>
        );
    }
    return (
        <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={() => signIn('google')}>
            Sign in with Google
        </button>
    );
}
