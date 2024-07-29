import React, { useState } from 'react';
import GaugeChart from 'react-gauge-chart';
import './GaugeChart.css'; // Import the CSS file for styling

// Sample data
const sampleData = {
  positivePoints: 70,
  negativePoints: 30,
  totalPoints: 100,
};

// Calculate percentages
const positivePercentage = (sampleData.positivePoints / sampleData.totalPoints) * 100;
const negativePercentage = (sampleData.negativePoints / sampleData.totalPoints) * 100;

// Renamed local component to avoid conflict
const GaugeChartDisplay = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="gauge-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="gauge-chart">
        <GaugeChart
          id="gauge-chart1"
          nrOfLevels={30}
          percent={positivePercentage / 100}
          arcWidth={0.2}
          textColor="#333"
          needleColor="#333"
          colors={['#4CAF50', '#FFC107']} // Green for positive, Amber for negative
          style={{ width: '200px', height: '200px' }}
        />
      </div>
      <div className={`tooltip ${hovered ? 'visible' : 'hidden'}`}>
        <div className="tooltip-item">
          <div className="tooltip-label">Positive Score:</div>
          <div className="tooltip-value">{positivePercentage.toFixed(2)}%</div>
        </div>
        <div className="tooltip-item">
          <div className="tooltip-label">Negative Score:</div>
          <div className="tooltip-value">{negativePercentage.toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
};

export default GaugeChartDisplay;
