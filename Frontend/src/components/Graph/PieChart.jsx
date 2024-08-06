import  { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import './PieChart.css'; // Import the CSS file

export default function PieCharts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchFRSData = async () => {
      try {
        const response = await fetch('http://localhost:4000/admin/frs/verticals');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedData = await response.json();

        // Calculate total FRS
        const totalFRS = fetchedData.reduce((sum, item) => sum + parseFloat(item.total_provided) || 0, 0);

        // Process data to fit PieChart format with percentages
        const processedData = fetchedData.map((item, index) => {
          const value = parseFloat(item.total_provided) || 0;
          return {
            id: index,
            value: value,
            label: `${item.vertical} (${((value / totalFRS) * 100).toFixed(2)}%)`
          };
        });

        setData(processedData);
      } catch (error) {
        console.error('Error fetching FRS data:', error);
      }
    };

    fetchFRSData();
  }, []);

  return (
    <div className="pie-chart-container">
      <PieChart
        margin={{ top: 0, bottom: 70, left: 0, right: 0 }}
        className="pie-chart"
        series={[
          {
            data,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        height={320}
        slotProps={{
          tooltip: {
            className: 'MuiPieChart-tooltip', // Apply custom CSS class
            valueFormatter: (value) => `FRS Points: ${value}`,
            labelFormatter: (label) => `${label}`,
            percentageFormatter: (percentage) => `(${percentage}%)`,
          },
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
            padding: 0,
          },
        }}
      />
    </div>
  );
}
