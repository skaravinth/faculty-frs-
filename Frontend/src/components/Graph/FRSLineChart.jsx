import React from 'react';
import PropTypes from 'prop-types';
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

const FRSLineChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'FRS Score',
        data: data.map(item => item.score),
        borderColor: '#3498DB', // Blue color for line
        backgroundColor: 'rgba(52, 152, 219, 0.1)', // Light blue fill color
        borderWidth: 2, // Line width
        pointBackgroundColor: '#3498DB', // Blue color for points
        pointRadius: 4, // Point size
        pointHoverRadius: 6, // Point size on hover
        tension: 0.4, // Curve tension
        fill: true, // Fill area under the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14, // Legend font size
          },
        },
      },
      title: {
        display: true,
        text: 'Monthly FRS Score',
        font: {
          size: 20, // Title font size
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide X-axis grid lines
        },
        ticks: {
          font: {
            size: 12, // X-axis label font size
          },
        },
      },
      y: {
        grid: {
          color: '#ECF0F1', // Light gray grid color
        },
        beginAtZero: true,
        ticks: {
          font: {
            size: 12, // Y-axis label font size
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

FRSLineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default FRSLineChart;
