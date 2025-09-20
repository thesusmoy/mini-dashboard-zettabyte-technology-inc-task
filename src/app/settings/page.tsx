'use client';

import React, { useState } from 'react';
import Card from '../../components/Card';

function LabeledInput({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
    return (
        <div>
            <label className="block font-semibold mb-1">{label}</label>
            <input className="border px-3 py-2 rounded w-full" {...props} />
        </div>
    );
}

function LabeledSwitch({ label, checked, onChange, id }: { label: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; id: string }) {
    return (
        <div className="flex items-center gap-2">
            <input type="checkbox" checked={checked} onChange={onChange} id={id} />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

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
                    <LabeledInput
                        label="Site Title"
                        value={siteTitle}
                        onChange={e => setSiteTitle(e.target.value)}
                    />
                    <LabeledSwitch
                        label="Enable Maintenance Mode"
                        checked={maintenance}
                        onChange={e => setMaintenance(e.target.checked)}
                        id="maintenance"
                    />
                    <LabeledSwitch
                        label="Allow User Registration"
                        checked={allowRegistration}
                        onChange={e => setAllowRegistration(e.target.checked)}
                        id="registration"
                    />
                    <LabeledInput
                        label="Admin Email"
                        value={adminEmail}
                        onChange={e => setAdminEmail(e.target.value)}
                        type="email"
                    />
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
