'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({
    isOpen,
    onClose,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-md shadow-lg"
                    >
                        <div className="flex justify-end">
                            <button onClick={onClose} className="text-gray-500">
                                Close
                            </button>
                        </div>
                        <div className="mt-2">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
