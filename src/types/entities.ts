// Post and User types for the dashboard app

export type Post = {
    id: number;
    title: string;
    body: string;
    userId: number;
};

export type User = {
    id: number;
    name: string;
    email: string;
    company: { name: string };
    phone: string;
    website: string;
};
