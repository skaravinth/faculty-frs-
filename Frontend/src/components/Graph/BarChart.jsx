import  { useState, useEffect } from 'react';
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

export default function SimpleBarChart() {
  const { width } = useWindowSize();
  const [firstSemesterGained, setFirstSemesterGained] = useState([]);
  const [firstSemesterLost, setFirstSemesterLost] = useState([]);
  const [secondSemesterGained, setSecondSemesterGained] = useState([]);
  const [secondSemesterLost, setSecondSemesterLost] = useState([]);
  const [months, setMonths] = useState([]);
  const [currentSemester, setCurrentSemester] = useState('');

  useEffect(() => {
    const fetchFRSData = async () => {
      try {
        const response = await fetch('http://localhost:4000/admin/frs/monthly');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log('Fetched data:', data);

        // Determine current semester
        const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)
        const isFirstSemester = currentMonth <= 6;
        setCurrentSemester(isFirstSemester ? 'First Semester' : 'Second Semester');

        const monthNames = {
          '01': 'January',
          '02': 'February',
          '03': 'March',
          '04': 'April',
          '05': 'May',
          '06': 'June',
          '07': 'July',
          '08': 'August',
          '09': 'September',
          '10': 'October',
          '11': 'November',
          '12': 'December',
        };

        const firstGained = [];
        const firstLost = [];
        const secondGained = [];
        const secondLost = [];
        const semesterMonths = [];

        data.forEach(item => {
          const month = item.month.split('-')[1];
          const monthName = monthNames[month];
          if (!semesterMonths.includes(monthName)) {
            semesterMonths.push(monthName);
          }

          if (parseInt(item.month.split('-')[1]) <= 6) {
            // First Semester
            firstGained.push(parseFloat(item.total_gained) || 0);
            firstLost.push(Math.abs(parseFloat(item.total_lost)) || 0);
          } else {
            // Second Semester
            secondGained.push(parseFloat(item.total_gained) || 0);
            secondLost.push(Math.abs(parseFloat(item.total_lost)) || 0);
          }
        });

        setFirstSemesterGained(firstGained);
        setFirstSemesterLost(firstLost);
        setSecondSemesterGained(secondGained);
        setSecondSemesterLost(secondLost);
        setMonths(semesterMonths);
      } catch (error) {
        console.error('Error fetching FRS data:', error);
      }
    };

    fetchFRSData();
  }, []);

  const getChartDimensions = () => {
    if (width <= 1024) {
      return { width: 980, height: 400 };
    } else if (width < 900) {
      return { width: 820, height: 380 };
    } else if (width < 768) {
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
    <>
      {currentSemester === 'First Semester' && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Even Semester</h3>
          <BarChart
            width={chartWidth}
            height={chartHeight}
            series={[
              { data: firstSemesterGained, label: 'FRS Given', id: 'firstGainedId' },
              { data: firstSemesterLost, label: 'FRS Taken', id: 'firstLostId', stackId: 'stack' },
            ]}
            xAxis={[{ data: months.slice(0, 6), scaleType: 'band' }]}
          />
        </div>
      )}
      {currentSemester === 'Second Semester' && (
        <div>
          <h3>Odd Semester</h3>
          <BarChart
            width={chartWidth}
            height={chartHeight}
            series={[
              { data: secondSemesterGained, label: 'FRS Given', id: 'secondGainedId' },
              { data: secondSemesterLost, label: 'FRS Taken', id: 'secondLostId', stackId: 'stack' },
            ]}
            xAxis={[{ data: months.slice(6), scaleType: 'band' }]}
          />
        </div>
      )}
    </>
  );
}
