import React from 'react';
import './VerticalwiseFRS.css';
import academicsImage from '../../../assets/images/academics.png';
import coeImage from '../../../assets/images/coe.png';
import iqacImage from '../../../assets/images/iqac.png';
import skillImage from '../../../assets/images/skill.png';
import specialLabImage from '../../../assets/images/special_lab.png';
import styled from 'styled-components';
import GaugeChart from '../../../components/Graph/GaugeChart.jsx';
import { useNavigate } from 'react-router-dom';

function VerticalwiseFRS() {

  const navigate = useNavigate();

const handleVerticalClick = () => {
    navigate('/head-dashboard');
  };

  return (
    <div className="verticalwise">
      <div className="grid1" onClick={handleVerticalClick}>
        <img src={academicsImage} alt="Academics" className="icon1" />
        <div className="name2">Academics</div>
        <GaugeChart />
      </div>
      <div className="grid1" onClick={handleVerticalClick}>
        <img src={coeImage} alt="COE" className="icon1" />
        <div className="name2">COE</div>
      </div>
      <div className="grid1" onClick={handleVerticalClick}>
        <img src={iqacImage} alt="IQAC" className="icon1" />
        <div className="name2">IQAC</div>
      </div>
      <div className="grid1" onClick={handleVerticalClick}>
        <img src={skillImage} alt="Skill" className="icon1" />
        <div className="name2">Skill</div>
      </div>
      <div className="grid1" onClick={handleVerticalClick}>
        <img src={specialLabImage} alt="Special Lab" className="icon1" />
        <div className="name2">Special Lab</div>
      </div>
    </div>
  );
}

export default VerticalwiseFRS;
