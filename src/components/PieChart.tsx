import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Posts', 'Users'],
    datasets: [
        {
            label: 'Distribution',
            data: [128, 32], // Replace with dynamic values if needed
            backgroundColor: ['rgba(99,102,241,0.7)', 'rgba(16,185,129,0.7)'],
            borderWidth: 1,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: { position: 'bottom' as const },
    },
};

export default function PieChart() {
    return (
        <div className="w-full max-w-xs mx-auto">
            <Pie data={data} options={options} />
        </div>
    );
}
