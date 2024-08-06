import  { useState, useEffect } from 'react';
import './VerticalwiseFRS.css';
import academicsImage from '../../../assets/images/academics.png';
import coeImage from '../../../assets/images/coe.png';
import iqacImage from '../../../assets/images/iqac.png';
import skillImage from '../../../assets/images/skill.png';
import specialLabImage from '../../../assets/images/special_lab.png';
import { useNavigate } from 'react-router-dom';

// Default verticals with images and initial FRS points of 0
const defaultVerticals = [
  { vertical: 'Academics', image: academicsImage, positiveScore: 0, negativeScore: 0 },
  { vertical: 'COE', image: coeImage, positiveScore: 0, negativeScore: 0 },
  { vertical: 'IQAC', image: iqacImage, positiveScore: 0, negativeScore: 0 },
  { vertical: 'Skill', image: skillImage, positiveScore: 0, negativeScore: 0 },
  { vertical: 'Special Lab', image: specialLabImage, positiveScore: 0, negativeScore: 0 },
];

function VerticalwiseFRS() {
  const navigate = useNavigate();
  const [verticals, setVerticals] = useState(defaultVerticals);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from backend
    fetch('http://localhost:4000/verticals/frs')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Ensure verticals array is not empty
        if (!Array.isArray(data)) {
          setError('Invalid data format');
          return;
        }
        const mergedData = defaultVerticals.map(defaultVertical => {
          const found = data.find(item => item.vertical === defaultVertical.vertical);
          return found ? { ...defaultVertical, ...found } : defaultVertical;
        });
        setVerticals(mergedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);

  const handleVerticalClick = (name) => {
    navigate('/head-dashboard', { state: { verticalName: name } });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="verticalwise1">
      {verticals.length > 0 ? (
        verticals.map((vertical, index) => (
          <div className="grid6" key={index} onClick={() => handleVerticalClick(vertical.vertical)}>
            <img src={vertical.image} alt={vertical.vertical} className="icon1" />
            <div className="name2">{vertical.vertical}</div>
            <div className='score'>
              <div className="positive-score">
                <span className="score-icon">▲</span>
                {vertical.positiveScore || 0} {/* Default to 0 if undefined */}
              </div>
              <div className="negative-score">
                <span className="score-icon">▼</span>
                {vertical.negativeScore || 0} {/* Default to 0 if undefined */}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No verticals available</div>
      )}
    </div>
  );
}

export default VerticalwiseFRS;
