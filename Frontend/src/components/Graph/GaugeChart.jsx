import React, { useState } from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const GaugeChart = ({ earned, lost, total }) => {
  // Calculate the gauge value based on earned and total
  const gaugeValue = (earned / total) * 100;

  // State for tooltip visibility
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  // Handle mouse enter and leave events to show/hide tooltip
  const handleMouseEnter = () => setTooltipVisible(true);
  const handleMouseLeave = () => setTooltipVisible(false);

  return (
    <div style={{ position: 'relative', width: '100px', height: '100px' }}>
      <Gauge
        width={100}
        height={100}
        value={gaugeValue}
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 30,
            color: theme.palette.primary.contrastText,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: '#52b202',
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {isTooltipVisible && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -150%)',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '14px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'opacity 0.3s ease',
            opacity: isTooltipVisible ? 1 : 0,
          }}
        >
          <div><strong>Earned:</strong> {earned}</div>
          <div><strong>Lost:</strong> {lost}</div>
        </div>
      )}
    </div>
  );
};

export default GaugeChart;
