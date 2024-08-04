import * as React from 'react';
import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts';

// Custom hook for window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

const pointsGained = [5800, 6050, 4700, 7200, 2800, 4200, 7100]; // Points gained for each month
const pointsLost = [870, 430, 1270, 2100, 950, 1100, 2100];    // Points lost for each month
const months = ['August', 'September', 'October', 'November', 'December', 'January', 'February'];

export default function SimpleBarChart() {
  const { width } = useWindowSize();

  const getChartDimensions = () => {
    if (width <= 1024) {
      return { width: 980, height: 400 };
    } else if (width < 900) {
      return { width: 820, height: 380 };
    }else if (width < 768) {
      return { width: 700, height: 350 };
    } else if (width < 600) {
      return { width: 550, height: 330 };
    } else if (width < 500) {
      return { width: 450, height: 400 };
    } else if (width < 425) {
      return { width: 390, height: 380 };
    } else if (width < 400) {
      return { width: 360, height: 380 };
    } else {
      return { width: 600, height: 350 };
    }
  };

  const { width: chartWidth, height: chartHeight } = getChartDimensions();

  return (
    <BarChart
      width={chartWidth}
      height={chartHeight}
      series={[
        { data: pointsGained, label: 'FRS Given', id: 'gainedId' },
        { data: pointsLost, label: 'FRS Taken', id: 'lostId' },
      ]}
      xAxis={[{ data: months, scaleType: 'band' }]}
    />
  );
}
