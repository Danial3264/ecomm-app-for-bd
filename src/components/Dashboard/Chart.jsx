import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components from Chart.js that we will use
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

// Chart data and options
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sales',
      data: [30, 45, 50, 60, 80, 90],
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.2)', // Line fill color
      borderColor: 'rgba(75,192,192,1)', // Line border color
      tension: 0.4, // Curve the line slightly
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Sales Over Time',
    },
    legend: {
      display: true,
      position: 'top',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const Chart = () => {
  return (
    <div className='md:col-span-2 lg:col-span-2'>
      <Line data={data} options={options} />
    </div>
  )
}

export default Chart
