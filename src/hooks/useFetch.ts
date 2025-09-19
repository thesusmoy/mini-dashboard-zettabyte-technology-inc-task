'use client';
import { useEffect, useState } from 'react';

export type FetchState<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
};

export default function useFetch<T = Record<string, unknown>>(url: string, options?: { simulateError?: boolean }) {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        let mounted = true;
        async function fetcher() {
            setState({ data: null, loading: true, error: null });
            try {
                // simulate intentional error by pointing to invalid endpoint
                const endpoint = options?.simulateError ? url.replace('/posts', '/invalid-posts') : url;
                const res = await fetch(endpoint);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (!mounted) return;
                setState({ data, loading: false, error: null });
            } catch (err: unknown) {
                if (!mounted) return;
                setState({ data: null, loading: false, error: (err as Error).message || 'Failed to fetch' });
            }
        }
        fetcher();
        return () => {
            mounted = false;
        };
    }, [url, options?.simulateError]);

    return state;
}
