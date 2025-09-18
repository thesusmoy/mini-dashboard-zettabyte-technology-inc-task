'use client';
import React from 'react';
import { motion } from 'framer-motion';

type Props = {
    title?: string;
    children?: React.ReactNode;
    className?: string;
};

export default function Card({ title, children, className = '' }: Props) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={`bg-white rounded-lg p-4 shadow-sm ${className}`}
        >
            {title && <h3 className="font-semibold mb-2">{title}</h3>}
            <div>{children}</div>
        </motion.div>
    );
}
