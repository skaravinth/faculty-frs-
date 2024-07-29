import React, { useState, useRef, useEffect } from 'react';
import './FRSChart.css';
import FRSLineChart from '../../../components/Graph/FRSLineChart';
import SortIcon from '@mui/icons-material/Sort';

const frsData = [
  { month: 'March', score: 10 },
  { month: 'April', score: 70 },
  { month: 'May', score: 30 },
  { month: 'June', score: 55 },
  { month: 'July', score: 20 },
  { month: 'August', score: 60 },
];

function FRSChart() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedVertical, setSelectedVertical] = useState('All');
  const dropdownRef = useRef(null);

  const getDummyDataForCategory = (category) => {
    switch (category) {
      case 'All':
        return frsData;
      case 'Academics':
        return [
          { month: 'March', score: 20 },
          { month: 'April', score: 50 },
          { month: 'May', score: 60 },
          { month: 'June', score: 40 },
          { month: 'July', score: 80 },
          { month: 'August', score: 90 },
        ];
      case 'Skill':
        return [
          { month: 'March', score: 30 },
          { month: 'April', score: 10 },
          { month: 'May', score: 40 },
          { month: 'June', score: 60 },
          { month: 'July', score: 10 },
          { month: 'August', score: 40 },
        ];
      case 'IQAC':
        return [
          { month: 'March', score: 10 },
          { month: 'April', score: 40 },
          { month: 'May', score: 20 },
          { month: 'June', score: 80 },
          { month: 'July', score: 50 },
          { month: 'August', score: 100 },
        ];
      case 'COE':
        return [
          { month: 'March', score: 20 },
          { month: 'April', score: 60 },
          { month: 'May', score: 40 },
          { month: 'June', score: 50 },
          { month: 'July', score: 10 },
          { month: 'August', score: 10 },
        ];
      case 'Special Lab':
        return [
          { month: 'March', score: 70 },
          { month: 'April', score: 10 },
          { month: 'May', score: 40 },
          { month: 'June', score: 30 },
          { month: 'July', score: 50 },
          { month: 'August', score: 10 },
        ];
      default:
        return [];
    }
  };

  const filteredData = getDummyDataForCategory(selectedVertical);

  const handleFilterChange = (filter) => {
    setSelectedVertical(filter);
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='frs-chart'>
      <div className='filter-dropdown' ref={dropdownRef}>
        <button className="filter-button" onClick={() => setShowDropdown(!showDropdown)}>
          <SortIcon className="filter-button-icon" />
        </button>
        {showDropdown && (
          <ul className="filter-menu">
            <li onClick={() => handleFilterChange('All')}>All</li>
            <li onClick={() => handleFilterChange('Academics')}>Academics</li>
            <li onClick={() => handleFilterChange('Skill')}>Skill</li>
            <li onClick={() => handleFilterChange('Special Lab')}>Special Lab</li>
            <li onClick={() => handleFilterChange('IQAC')}>IQAC</li>
            <li onClick={() => handleFilterChange('COE')}>COE</li>
          </ul>
        )}
      </div>
      <div className='selected-vertical'>{selectedVertical}</div>
      <div className="chart-container">
        <FRSLineChart data={filteredData} />
      </div>
    </div>
  );
}

export default FRSChart;
