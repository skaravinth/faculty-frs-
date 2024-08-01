import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import './PieChart.css'; // Import the CSS file

const data = [
  { id: 0, value: 10, label: 'Academics' },
  { id: 1, value: 15, label: 'COE' },
  { id: 2, value: 20, label: 'IQAC' },
  { id: 3, value: 15, label: 'Skill' },
  { id: 4, value: 20, label: 'Special Lab' },
];

export default function PieCharts() {
  return (
    <div className="pie-chart-container">
      <PieChart
      margin={{ top: 0, bottom: 70, left: 0, right:0 }}
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
