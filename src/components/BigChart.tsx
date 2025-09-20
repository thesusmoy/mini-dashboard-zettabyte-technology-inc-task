import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'Posts',
            data: [12, 19, 13, 15, 22, 30],
            backgroundColor: 'rgba(99,102,241,0.7)',
        },
        {
            label: 'Users',
            data: [5, 8, 6, 10, 12, 15],
            backgroundColor: 'rgba(16,185,129,0.7)',
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: { position: 'top' as const },
        title: { display: true, text: 'Posts & Users Growth' },
    },
};

export default function BigChart() {
    return <Bar data={data} options={options} height={320} />;
}
