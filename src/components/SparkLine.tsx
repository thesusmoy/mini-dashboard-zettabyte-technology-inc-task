import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const sparkData = {
    labels: ['', '', '', '', '', ''],
    datasets: [
        {
            label: 'Posts',
            data: [20, 40, 25, 55, 35, 65],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99,102,241,0.12)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2,
        },
        {
            label: 'Users',
            data: [10, 18, 12, 22, 17, 25],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16,185,129,0.12)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2,
        },
    ],
};

const sparkOptions = {
    responsive: true,
    plugins: { legend: { display: true, position: 'bottom' as const } },
    scales: {
        x: { display: false },
        y: { display: false },
    },
    animation: {
        duration: 1200,
        easing: 'easeInOutQuart' as const,
    },
};

export default function SparkLine() {
    return (
        <div className="w-full overflow-x-auto">
            <Line data={sparkData} options={sparkOptions} height={60} />
        </div>
    );
}
