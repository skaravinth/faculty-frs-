import React, { useState, useEffect } from 'react';
import { Tabs, Tab, TextField, Button, Box, Grid, Paper } from '@mui/material';
import formImage from '../../../assets/images/development.png';
import FacultyPopup from './FacultyPopup';
import './FRSEntry.css';
import PropTypes from 'prop-types';

const TextFields = ({ formData, handleChange, handlePopupOpen, showPopup }) => (
  <>
    <TextField
      fullWidth
      label="Faculty Name"
      name="facultyName"
      value={formData.facultyName}
      onChange={handleChange}
      onClick={showPopup ? handlePopupOpen : null}
      variant="outlined"
      margin="normal"
    />
    <TextField
      fullWidth
      label="Faculty ID"
      name="facultyID"
      value={formData.facultyID}
      onChange={handleChange}
      onClick={showPopup ? handlePopupOpen : null}
      variant="outlined"
      margin="normal"
    />
    <TextField
      fullWidth
      label="FRS"
      name="frs"
      value={formData.frs}
      onChange={handleChange}
      variant="outlined"
      margin="normal"
    />
    <TextField
      fullWidth
      label="Reason Title"
      name="reasonTitle"
      value={formData.reasonTitle}
      onChange={handleChange}
      variant="outlined"
      margin="normal"
    />
    <TextField
      fullWidth
      label="Reason"
      name="reason"
      value={formData.reason}
      onChange={handleChange}
      variant="outlined"
      margin="normal"
      multiline
      rows={2}
    />
    <TextField
      fullWidth
      label="Vertical Head ID"
      name="verticalheadsid"
      value={formData.verticalheadsid}
      onChange={handleChange}
      variant="outlined"
      margin="normal"
    />
    <TextField
      fullWidth
      label="Vertical"
      name="vertical"
      value={formData.vertical}
      onChange={handleChange}
      variant="outlined"
      margin="normal"
    />
  </>
);

TextFields.propTypes = {
  formData: PropTypes.shape({
    facultyName: PropTypes.string.isRequired,
    facultyID: PropTypes.string.isRequired,
    frs: PropTypes.string.isRequired,
    reasonTitle: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
    verticalheadsid: PropTypes.string.isRequired,
    vertical: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handlePopupOpen: PropTypes.func.isRequired,
  showPopup: PropTypes.bool.isRequired,
};

const FRSEntry = ({ user }) => {
  const verticalDisplayNames = {
    vertical_academics: 'Academics',
    vertical_coe: 'COE',
    vertical_iqac: 'IQAC',
    vertical_skillteam: 'Skill Team',
    vertical_speciallab: 'Special Lab',
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

  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    facultyName: '',
    facultyID: '',
    frs: '',
    reasonTitle: '',
    reason: '',
    verticalheadsid: user.id,
    vertical: getVerticalName(),
  });

  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
  const [hasSubmitted, setHasSubmitted] = useState(false); // Add single submission flag

  useEffect(() => {
    const fetchFacultyList = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/faculty/list', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log('Fetched faculty list:', data);

        if (data && Array.isArray(data.users)) {
          setFacultyList(data.users);
        } else {
          console.error('Expected data.users to be an array but received:', typeof data.users);
        }
      } catch (error) {
        console.error('Error fetching faculty list:', error);
      }
    };

    fetchFacultyList();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({
      facultyName: '',
      facultyID: '',
      frs: '',
      reasonTitle: '',
      reason: '',
      verticalheadsid: user.id,
      vertical: getVerticalName(),
    });
    setSelectedFaculty([]);
    setResponseMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting || hasSubmitted) return; // Prevent submission if already in progress or already submitted

    setIsSubmitting(true);
    console.log('Form Data:', formData);

    // Split the comma-separated values into arrays
    const facultyIDs = formData.facultyID.split(',').map(id => id.trim());
    const facultyNames = formData.facultyName.split(',').map(name => name.trim());

    try {
      // Prepare data for bulk or individual submission
      const bulkData = facultyIDs.map((id, index) => ({
        ...formData,
        facultyName: facultyNames[index],
        facultyID: id,
      }));

      console.log('Bulk Data:', bulkData); // Log the data being sent

      const response = await fetch('http://localhost:4000/api/frs/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ facultyData: bulkData }), // Convert data to JSON string
      });

      const result = await response.json(); // Parse the JSON response
      console.log('Submission result:', result);

      if (response.ok) {
        setResponseMessage('FRS added successfully!');
        setHasSubmitted(true); // Mark as submitted
        handleClear(); // Clear form after submission
      } else {
        console.error('Server responded with an error:', result);
        setResponseMessage(`Error submitting FRS: ${result.message}`);
      }

    } catch (error) {
      console.error('Error submitting FRS:', error);
      setResponseMessage('Error submitting FRS. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleFacultyChange = (newSelectedFaculty) => {
    setSelectedFaculty(newSelectedFaculty);
  };

  const handlePopupSubmit = () => {
    console.log('facultyList:', facultyList);
    console.log('selectedFaculty:', selectedFaculty);

    if (!Array.isArray(facultyList)) {
      console.error('facultyList is not an array:', facultyList);
      return;
    }

    const selectedFaculties = facultyList.filter((faculty) =>
      selectedFaculty.includes(faculty.id)
    );

    const facultyNames = selectedFaculties.map((faculty) => faculty.name).join(', ');
    const facultyIDs = selectedFaculties.map((faculty) => faculty.id).join(', ');

    setFormData({
      ...formData,
      facultyName: facultyNames,
      facultyID: facultyIDs,
    });

    handlePopupClose();
  };

  return (
    <Box className="frs-entry-container">
      <Paper elevation={3} className="frs-entry-paper">
        <div className="form-head">FRS Update</div>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Individual" sx={{ fontWeight: 'bold' }} />
          <Tab label="Bulk" sx={{ fontWeight: 'bold' }} />
        </Tabs>
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextFields
                form                formData={formData}
                handleChange={handleChange}
                handlePopupOpen={handlePopupOpen}
                showPopup={tabValue === 1}
              />
              <Box mt={2} className="button-container">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClear}
                  className="clear-button"
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="submit-button"
                  // Disable button if submitting or already submitted
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </Box>
              {responseMessage && (
                <Box mt={2} className="response-message">
                  {responseMessage}
                </Box>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              container
              justifyContent="center"
              alignItems="center"
            >
              <img src={formImage} alt="FRS Illustration" className="frs-illustration" />
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <FacultyPopup
        open={popupOpen}
        onClose={handlePopupClose}
        facultyList={facultyList}
        selectedFaculty={selectedFaculty}
        handleFacultyChange={handleFacultyChange}
        handlePopupSubmit={handlePopupSubmit}
      />
    </Box>
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

