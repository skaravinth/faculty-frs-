import React from 'react';
import './VerticalwiseFRS.css';
import academicsImage from '../../../assets/images/academics.png';
import coeImage from '../../../assets/images/coe.png';
import iqacImage from '../../../assets/images/iqac.png';
import skillImage from '../../../assets/images/skill.png';
import specialLabImage from '../../../assets/images/special_lab.png';
import styled from 'styled-components';
import GaugeChartDisplay from '../../../components/Graph/GaugeChart.jsx';

function VerticalwiseFRS() {
  return (
    <div className="verticalwise">
      <div className="grid">
        <img src={academicsImage} alt="Academics" className="icon" />
        <div className="name">Academics</div>
        <GaugeChartDisplay />
      </div>
      <div className="grid">
        <img src={coeImage} alt="COE" className="icon" />
        <div className="name">COE</div>
      </div>
      <div className="grid">
        <img src={iqacImage} alt="IQAC" className="icon" />
        <div className="name">IQAC</div>
      </div>
      <div className="grid">
        <img src={skillImage} alt="Skill" className="icon" />
        <div className="name">Skill</div>
      </div>
      <div className="grid">
        <img src={specialLabImage} alt="Special Lab" className="icon" />
        <div className="name">Special Lab</div>
      </div>
    </div>
  );
}

export default VerticalwiseFRS;
