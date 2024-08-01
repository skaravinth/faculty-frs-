import * as React from 'react';
import { BarChart } from '@mui/x-charts';

const pointsGained = [5800, 6050, 4700, 7200, 2800, 4200, 7100]; // Points gained for each month
const pointsLost = [870, 430, 1270, 2100, 950, 1100, 2100];    // Points lost for each month
const months = ['August', 'September', 'October', 'November', 'December', 'January', 'February'];

export default function SimpleBarChart() {
  return (
    <BarChart
      width={600}
      height={350}
      series={[
        { data: pointsGained, label: 'FRS Given', id: 'gainedId' },
        { data: pointsLost, label: 'FRS Taken', id: 'lostId' },
      ]}
      xAxis={[{ data: months, scaleType: 'band' }]}
    />
  );
}
