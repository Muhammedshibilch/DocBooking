// filepath: /frontend/src/pages/Doctors.jsx
import React, { useEffect, useState } from 'react';
import DoctorCards from '../components/DoctorCards';
import { allDoctorAPI } from '../services/allAPI';

const Doctors = () => {
  const [homeDoctors, setHomeDoctors] = useState([]);

  useEffect(() => {
    getHomeDoctors();
  }, []);

  const getHomeDoctors = async () => {
    try {
      const result = await allDoctorAPI();
      if (result.status === 200) {
        setHomeDoctors(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p>Browse through the doctors specialist.</p>
      <div className="row mt-4">
        <div className="col-lg-2">
          <p className="border-b border-dotted border-gray-400 pb-2 mb-2 cursor-pointer"> &nbsp; General physician</p>
          <p className="border-b border-dotted border-gray-400 pb-2 mb-2 cursor-pointer"> &nbsp; Gynecologist</p>
          <p className="border-b border-dotted border-gray-400 pb-2 mb-2 cursor-pointer"> &nbsp; Dermatologist</p>
          <p className="border-b border-dotted border-gray-400 pb-2 mb-2 cursor-pointer"> &nbsp; Pediatricians</p>
          <p className="border-b border-dotted border-gray-400 pb-2 mb-2 cursor-pointer"> &nbsp; Neurologist</p>
          <p className="border-b border-dotted border-gray-400 pb-2 mb-2 cursor-pointer"> &nbsp; Gastroenterologist</p>
        </div>
        <div className="col-lg-10">
          <div className="row">
            {homeDoctors.map(doctor => (
              <DoctorCards key={doctor._id} displayData={doctor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;