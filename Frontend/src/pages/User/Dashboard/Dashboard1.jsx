import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import FRSLineChart from '../../../components/Graph/FRSLineChart';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'; // Importing the icon
import SortIcon from '@mui/icons-material/Sort';
import frsTotalImage from '../../../assets/images/coe.avif';
import frsGainedImage from '../../../assets/images/skill.avif';
import frsLostImage from '../../../assets/images/academics.jpg';

const Dashboard = () => {
  const [frsData, setFrsData] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedVertical, setSelectedVertical] = useState('All');
  const dropdownRef = useRef(null); // Ref for the dropdown

  useEffect(() => {
    // Dummy data for now
    const dummyData = [
      { month: 'March', score: 50, category: 'Skill' },
      { month: 'April', score: 60, category: 'Academics' },
      { month: 'May', score: 10, category: 'IQAC' },
      { month: 'June', score: 30, category: 'COE' },
      { month: 'July', score: 15, category: 'Special Lab' },
      { month: 'August', score: 40, category: 'Skill' },
    ];

    // Set dummy data
    setFrsData(dummyData);
  }, []);

  // Close dropdown when clicking outside
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

  const handleFilterChange = (category) => {
    setFilter(category);
    setSelectedVertical(category); // Update selected vertical
    setShowDropdown(false);
  };

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

  const filteredData = getDummyDataForCategory(filter);

  return (
    <div className='body'>
      {/* Left Side Section */}
      <div className="left-grid">
        {/* Profile Card Section */}
        <div className="profile">
          <div className="profile-details">
            <div className="profile-text" style={{ color: '#424242', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>Nithish Kumar S</div>
            <div className="profile-text" style={{ color: '#616161', marginBottom: '4px' }}>7376231ABE123</div>
            <div className="profile-text" style={{ color: '#616161', marginBottom: '4px', fontStyle: 'italic' }}>nithishkumar@bitsathy.ac.in</div>
            <div className="profile-text" style={{ color: '#616161', marginBottom: '4px' }}>Assisstant Professor Level III</div>
            <div className="profile-text" style={{ color: '#616161', marginBottom: '4px' }}>Computer Science and Engineering</div>
            <div className="profile-text" style={{ color: '#757575', marginBottom: '5px', marginTop: '12px' }}><strong>Verticals :    Skill, Academics and IQAC</strong></div>
          </div>
          <div className="profile-image"></div>
        </div>
        <div className="text">FRS Summary</div>
        {/* FRS Summary Section */}
        <div className="frs-summary">
  {/* Summary 1 */}
  <div className="summary summary1">
    <img className="summary-image" src={frsTotalImage} alt="FRS Total Image" />
    <div className="summary-text">
      <span className="summary-title">FRS Total</span>
      <span className="summary-value" style={{color: '#29B6F6', fontWeight: 'bold'}}>3000</span>
    </div>
  </div>
  {/* Summary 2 */}
  <div className="summary summary2">
    <img className="summary-image" src={frsGainedImage} alt="FRS Gained Image" />
    <div className="summary-text">
      <span className="summary-title">FRS Gained</span>
      <span className="summary-value" style={{color: '#00C853', fontWeight: 'bold'}}>3600</span>
    </div>
  </div>
  {/* Summary 3 */}
  <div className="summary summary3">
    <img className="summary-image" src={frsLostImage} alt="FRS Lost Image" />
    <div className="summary-text">
      <span className="summary-title">FRS Lost</span>
      <span className="summary-value" style={{color: '#FF3D00', fontWeight: 'bold'}}>-600</span>
    </div>
  </div>
</div>


        <div className="text">Monthwise FRS Score for this Current Semester is represented Graphically</div>
        {/* FRS Growth Chart Section */}
        <div className='frs-chart'>
          <div className='filter-dropdown' ref={dropdownRef}>
            <button className="filter-button" onClick={() => setShowDropdown(!showDropdown)}>
              <SortIcon className="filter-button-icon" /> {/* Icon */}
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
          {/* Display selected vertical in FRS chart section */}
          <div className='selected-vertical'>{selectedVertical}</div>
          <FRSLineChart data={filteredData} />
        </div>
      </div>

      {/* Right Side Section */}
      <div className='right-grid'>
        <div className="text">Verticalwise FRS</div>
        {/* Verticalwise Section */}
        <div className='vertical'>
          <div className='vertical1' onClick={() => handleFilterChange('Academics')}>Academics</div>
          <div className='vertical2' onClick={() => handleFilterChange('Skill')}>Skill</div>
          <div className='vertical3' onClick={() => handleFilterChange('Special Lab')}>Special Lab</div>
          <div className='vertical4' onClick={() => handleFilterChange('COE')}>COE</div>
          {/* <div className='vertical5' onClick={() => handleFilterChange('IQAC')}>IQAC</div> */}
        </div>
        <div className="text">Recent Updates</div>
        {/* Recent Updates Section */}
        <div className='recent-frs'>Recent Updates</div>
      </div>
    </div>
  );
};

export default Dashboard;
