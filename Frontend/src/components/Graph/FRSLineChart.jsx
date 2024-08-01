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
  Filler,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

const FRSLineChart = ({ data }) => {
  const showDataLabels = window.innerWidth > 768;

  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'FRS Score',
        data: data.map(item => item.score),
        borderColor: '#007BFF', // Primary blue color
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          return getGradient(ctx, chartArea);
        },
        borderWidth: 3,
        pointBackgroundColor: '#007BFF',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.3,
        fill: true,
        datalabels: {
          display: showDataLabels,
          color: '#007BFF',
          align: 'end',
          anchor: 'end',
          offset: 8,
          font: {
            weight: 'bold',
            size: 14,
          },
          formatter: (value) => value.toFixed(2),
        },
      },
    ],
  };

  const getGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(0, 123, 255, 0.3)'); // Light blue start
    gradient.addColorStop(1, 'rgba(0, 123, 255, 0)'); // Transparent end
    return gradient;
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 16,
            weight: 'bold',
          },
          color: '#333',
        },
      },
      title: {
        display: true,
        text: 'Monthly FRS Score',
        font: {
          size: 22,
          weight: 'bold',
        },
        color: '#333',
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        cornerRadius: 6,
        padding: 12,
        xAlign: 'center',
        yAlign: 'bottom',
        callbacks: {
          label: function (tooltipItem) {
            return `Score: ${tooltipItem.raw.toFixed(2)}`;
          },
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
            size: 14,
            color: '#666',
          },
        },
      },
      y: {
        grid: {
          color: '#ddd', // Light gray grid color
          lineWidth: 1,
        },
        beginAtZero: true,
        ticks: {
          font: {
            size: 14,
            color: '#666',
          },
        },
      },
    },
    elements: {
      line: {
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        borderWidth: 4, // Slightly thicker line
      },
      point: {
        hoverBackgroundColor: '#28A745', // Green on hover
        hoverBorderColor: '#fff',
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutCubic',
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
