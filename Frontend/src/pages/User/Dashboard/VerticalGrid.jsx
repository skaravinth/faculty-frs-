import React from 'react';
import './VerticalGrid.css';
import academicsImage from '../../../assets/images/academics.png';
import coeImage from '../../../assets/images/coe.png';
import iqacImage from '../../../assets/images/iqac.png';
import skillImage from '../../../assets/images/skill.png';
import specialLabImage from '../../../assets/images/special_lab.png';
import styled from 'styled-components';

function VerticalGrid() {

  const earned = 80;
  const lost = 20;
  const total = 100;

  return (
    <div className="verticalwise">
      <div className="grid">
        <img src={academicsImage} alt="Academics" className="icon" />
        <div className="name">Academics</div>
           <div className='frs-score'>1700</div>
      </div>
      <div className="grid">
        <img src={coeImage} alt="COE" className="icon" />
        <div className="name">COE</div>
           <div className='frs-score'>300</div>
      </div>
      <div className="grid">
        <img src={iqacImage} alt="IQAC" className="icon" />
        <div className="name">IQAC</div>
           <div className='frs-score'>570</div>
      </div>
      <div className="grid">
        <img src={skillImage} alt="Skill" className="icon" />
        <div className="name">Skill</div>
           <div className='frs-score'>430</div>
      </div>
      <div className="grid">
        <img src={specialLabImage} alt="Special Lab" className="icon" />
        <div className="name">SpecialLab</div>
           <div className='frs-score'>1000</div>
      </div>
    </div>
  );
}

export default VerticalGrid;
