// filepath: /frontend/src/components/DoctorCards.jsx
import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import SERVER_BASE_URL from '../services/serverUrl';
import { Link } from 'react-router-dom';

const DoctorCards = ({ displayData, onDelete, clickable = true }) => {
  return (
    <div className='col-lg-3 pb-3'>
      <MDBCard className="transition-transform transform hover:scale-105 hover:drop-shadow-lg">
        {clickable ? (
          <Link to={`/appointment/${displayData._id}`}>
            <MDBCardImage src={`${SERVER_BASE_URL}/uploads/${displayData?.doctorImg}`} alt='...' position='top' />
          </Link>
        ) : (
          <MDBCardImage src={`${SERVER_BASE_URL}/uploads/${displayData?.doctorImg}`} alt='...' position='top' />
        )}
        <MDBCardBody>
          <MDBCardText className='text-green-500'>
            🟢 Available
          </MDBCardText>
          <MDBCardTitle>{displayData?.doctorName}</MDBCardTitle>
          <MDBCardText>
            {displayData.speciality}
          </MDBCardText>
          <div className="d-flex justify-content-between">
            {clickable && (
              <Link to={`/appointment/${displayData._id}`}>
                {/* Empty link to maintain spacing */}
              </Link>
            )}
            {onDelete && (
              <FontAwesomeIcon
                icon={faTrash}
                className="text-red-500 cursor-pointer"
                onClick={() => onDelete(displayData._id)}  // Trigger delete function passed as prop
              />
            )}
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default DoctorCards;