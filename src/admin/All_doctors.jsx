// filepath: /frontend/src/pages/All_doctors.jsx
import React, { useEffect, useState } from 'react';
import Header_admin from './component/Header_admin';
import Sidebar_admin from './component/Sidebar_admin';
import DoctorCards from '../components/DoctorCards';
import { allDoctorAPI, deleteDoctorAPI } from '../services/allAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const All_doctors = () => {
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
      toast.error('Failed to fetch doctors. Please try again.');
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    try {
      const result = await deleteDoctorAPI(doctorId);
      if (result.status === 200) {
        setHomeDoctors(homeDoctors.filter(doctor => doctor._id !== doctorId));  // Update state after deletion
        toast.success('Doctor deleted successfully');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to delete doctor. Please try again.');
    }
  };

  return (
    <>
      <Header_admin />
      <div className="d-flex">
        <div className="col-lg-2">
          <Sidebar_admin />
        </div>
        <div className="col-lg-10">
          <div className="row">
            {homeDoctors.map(doctor => (
              <DoctorCards key={doctor._id} displayData={doctor} onDelete={handleDeleteDoctor} clickable={false} />
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default All_doctors;