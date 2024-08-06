// import React, { useEffect, useState } from 'react';
// import './VerticalGrid.css';
// import academicsImage from '../../../assets/images/academics.png';
// import coeImage from '../../../assets/images/coe.png';
// import iqacImage from '../../../assets/images/iqac.png';
// import skillImage from '../../../assets/images/skill.png';
// import specialLabImage from '../../../assets/images/special_lab.png';
// import PropTypes from 'prop-types';

// // Image map to easily access images based on vertical name
// const imageMap = {
//   Academics: academicsImage,
//   COE: coeImage,
//   IQAC: iqacImage,
//   Skill: skillImage,
//   'Special Lab': specialLabImage,
// };

// function VerticalGrid({ user }) {
//   const [frsPoints, setFrsPoints] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (user && user.id) {
//       fetch(`http://localhost:4000/verticalvisefrs/${user.id}`)
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then(data => {
//           console.log('Response Data:', data); // Log the response data for debugging
//           setFrsPoints(data);
//         })
//         .catch(error => {
//           console.error('Error fetching data:', error);
//           setError(error.message);
//         });
//     }
//   }, [user.id]);

//   if (!user || !user.id) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="verticalwise">
//       {frsPoints.map(point => (
//         <div className="grid" key={point.vertical}>
//           <img src={imageMap[point.vertical]} alt={point.vertical} className="icon" />
//           <div className="name">{point.vertical}</div>
//           <div className='frs-score'>{Number(point.total_frs_points).toFixed(2)}</div>
//         </div>
//       ))}
//     </div>
//   );
// }

// VerticalGrid.propTypes = {
//   user: PropTypes.shape({
//     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   }).isRequired,
// };

// export default VerticalGrid;
import React, { useEffect, useState } from 'react';
import './VerticalGrid.css';
import academicsImage from '../../../assets/images/academics.png';
import coeImage from '../../../assets/images/coe.png';
import iqacImage from '../../../assets/images/iqac.png';
import skillImage from '../../../assets/images/skill.png';
import specialLabImage from '../../../assets/images/special_lab.png';
import PropTypes from 'prop-types';

// Default verticals with images and initial FRS points of 0
const defaultVerticals = [
  { vertical: 'Academics', image: academicsImage, total_frs_points: 0 },
  { vertical: 'COE', image: coeImage, total_frs_points: 0 },
  { vertical: 'IQAC', image: iqacImage, total_frs_points: 0 },
  { vertical: 'Skill', image: skillImage, total_frs_points: 0 },
  { vertical: 'Special Lab', image: specialLabImage, total_frs_points: 0 },
];

function VerticalGrid({ user }) {
  const [frsPoints, setFrsPoints] = useState(defaultVerticals);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:4000/verticalvisefrs/${user.id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Response Data:', data); // Log the response data for debugging
          const mergedData = defaultVerticals.map(defaultVertical => {
            const found = data.find(item => item.vertical === defaultVertical.vertical);
            return found ? { ...defaultVertical, total_frs_points: Number(found.total_frs_points) } : defaultVertical;
          });
          setFrsPoints(mergedData);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError(error.message);
        });
    }
  }, [user.id]);

  if (!user || !user.id) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="verticalwise">
      {frsPoints.map(point => (
        <div className="grid" key={point.vertical}>
          <img src={point.image} alt={point.vertical} className="icon" />
          <div className="name">{point.vertical}</div>
          <div className='frs-score'>{point.total_frs_points}</div>
        </div>
      ))}
    </div>
  );
}

VerticalGrid.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default VerticalGrid;
