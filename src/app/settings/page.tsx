'use client';
import React, { useState } from 'react';
import Card from '../../components/Card';

export default function SettingsPage() {
    const [siteTitle, setSiteTitle] = useState('Mini Dashboard');
    const [maintenance, setMaintenance] = useState(false);
    const [allowRegistration, setAllowRegistration] = useState(true);
    const [adminEmail, setAdminEmail] = useState('admin@example.com');

    function handleSave(e: React.FormEvent) {
        e.preventDefault();
        // Here you would send settings to backend
        alert('Settings saved! (Demo only)');
    }

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <Card title="Admin Settings">
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="block font-semibold mb-1">Site Title</label>
                        <input
                            className="border px-3 py-2 rounded w-full"
                            value={siteTitle}
                            onChange={(e) => setSiteTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={maintenance}
                            onChange={(e) => setMaintenance(e.target.checked)}
                            id="maintenance"
                        />
                        <label htmlFor="maintenance">Enable Maintenance Mode</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={allowRegistration}
                            onChange={(e) => setAllowRegistration(e.target.checked)}
                            id="registration"
                        />
                        <label htmlFor="registration">Allow User Registration</label>
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Admin Email</label>
                        <input
                            className="border px-3 py-2 rounded w-full"
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            type="email"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-700 transition-colors"
                    >
                        Save Settings
                    </button>
                </form>
            </Card>
        </div>
    );
}
