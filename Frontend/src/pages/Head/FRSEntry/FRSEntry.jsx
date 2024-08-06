import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Autocomplete } from '@mui/material';
import './FRSEntry.css';
import PropTypes from 'prop-types';

const verticalDisplayNames = {
  vertical_academics: 'Academics',
  vertical_coe: 'COE',
  vertical_iqac: 'IQAC',
  vertical_skillteam: 'Skill Team',
  vertical_speciallab: 'Special Lab',
};

const FRSEntry = ({ user }) => {
  const [frsUpdateValue, setFrsUpdateValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    id: '',
    email: '',
    
    frs_update: '',
    reason: '',
    reason_info: '',
    vertical: ''
  });

  const options = ['50', '100', '200', '1000'];

  const handleInputChange = (event, newInputValue) => {
    if (/^-?\d*$/.test(newInputValue)) {
      setInputValue(newInputValue);
      setFrsUpdateValue(newInputValue);
      setFormData({ ...formData, frs_update: newInputValue });
    }
  };

  const getVerticalName = () => {
    const verticals = user.verticals;
    for (const key in verticals) {
      if (verticals[key] === 1) {
        return verticalDisplayNames[key] || key;
      }
    }
    return '';
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      vertical: getVerticalName()
    }));
  }, [user]);
console.log(user.id)
  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post('http://localhost:4000/verticalhead', {
      ...formData,
      verticalHeadId: user.id,
     
    })
      .then(response => {
        console.log('Form submitted successfully:', response.data);
      })
      .catch(error => {
        if (error.response) {
          console.error('Error response:', error.response);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('General Error:', error.message);
        }
        console.error('Error config:', error.config);
      });
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <div>
        <h1>FRS Entry</h1>
      </div>
      <Box
        component="form"
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
          maxWidth: '800px',
          marginTop: '40px',
          padding: 2,
          backgroundColor: '#e1e8ee',
          borderRadius: '8px',
          border: '1px solid #1e90ff',
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="faculty-info">
          <p style={{ color: '#083983', fontSize: '16px', fontWeight: 'bold' }}>Faculty Info</p>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            placeholder="Name"
            variant="outlined"
            value={formData.name}
            onChange={handleFieldChange}
          />
          <TextField
            required
            id="id"
            name="id"
            label="Faculty ID"
            placeholder="FACULTY ID"
            variant="outlined"
            value={formData.id}
            onChange={handleFieldChange}
          />
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            placeholder="EMAIL"
            variant="outlined"
            value={formData.email}
            onChange={handleFieldChange}
          />
        </div>
        
        <div className="faculty-update">
          <p style={{ color: '#083983', fontSize: '16px', fontWeight: 'bold' }}>FRS Update</p>
          <Autocomplete
            freeSolo
            value={frsUpdateValue}
            onChange={(event, newValue) => {
              setFrsUpdateValue(newValue || '');
              setFormData({ ...formData, frs_update: newValue || '' });
            }}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                id="frs_update"
                name="frs_update"
                label="FRS Update"
                placeholder="FRS Update"
                variant="outlined"
                value={formData.frs_update}
                inputProps={{
                  ...params.inputProps,
                  pattern: "^-?\\d*$",
                  type: 'text'
                }}
              />
            )}
          />
          <TextField
            required
            id="reason"
            name="reason"
            label="Reason"
            placeholder="Reason"
            variant="outlined"
            value={formData.reason}
            onChange={handleFieldChange}
          />
          <TextField
            required
            id="reason_info"
            name="reason_info"
            label="Reason Info"
            placeholder="Reason Info"
            variant="outlined"
            value={formData.reason_info}
            onChange={handleFieldChange}
          />
          <div className='filling' style={{ gridColumn: 'span 2' }}>
            <button className='submit' type="submit">Submit</button>
            <button className='Cancel' type="reset">Cancel</button>
          </div>
        </div>
        <div className="vertical-info">
          <p style={{ color: '#083983', fontSize: '16px', fontWeight: 'bold' }}>
            Vertical: {formData.vertical}
          </p>
        </div>
      </Box>
    </div>
  );
};

FRSEntry.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    verticals: PropTypes.objectOf(PropTypes.number).isRequired,
   
  }).isRequired,
};

export default FRSEntry;
