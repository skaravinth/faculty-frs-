import React from 'react';
import './VerticalwiseFRS.css';
import academicsImage from '../../../assets/images/academics.png';
import coeImage from '../../../assets/images/coe.png';
import iqacImage from '../../../assets/images/iqac.png';
import skillImage from '../../../assets/images/skill.png';
import specialLabImage from '../../../assets/images/special_lab.png';
import { useNavigate } from 'react-router-dom';

function VerticalwiseFRS() {
  const navigate = useNavigate();

  const handleVerticalClick = () => {
    navigate('/head-dashboard');
  };

  const verticals = [
    { name: 'Academics', image: academicsImage, positiveScore: 12300, negativeScore: -2300 },
    { name: 'COE', image: coeImage, positiveScore: 8900, negativeScore: -2900 },
    { name: 'IQAC', image: iqacImage, positiveScore: 7600, negativeScore: -1600 },
    { name: 'Skill', image: skillImage, positiveScore: 10500, negativeScore: -1500 },
    { name: 'Special Lab', image: specialLabImage, positiveScore: 9400, negativeScore: -1400 },
  ];

  return (
    <div className="verticalwise1">
      {verticals.map((vertical, index) => (
        <div className="grid6" key={index} onClick={handleVerticalClick}>
          <img src={vertical.image} alt={vertical.name} className="icon1" />
          <div className="name2">{vertical.name}</div>
          <div className='score'>
            <div className="positive-score">
              <span className="score-icon">▲</span>
              {vertical.positiveScore}
            </div>
            <div className="negative-score">
              <span className="score-icon">▼</span>
              {vertical.negativeScore}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VerticalwiseFRS;
