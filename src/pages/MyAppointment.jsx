import React, { useState, useEffect } from 'react';
import { getAllAppointmentsAPI, cancelAppointmentAPI } from '../services/allAPI';
import SERVER_BASE_URL from '../services/serverUrl';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const userId = JSON.parse(sessionStorage.getItem("users"))._id; 

    try {
      const result = await getAllAppointmentsAPI(userId);
      if (result.status === 200) {
        setAppointments(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const result = await cancelAppointmentAPI(appointmentId);
      if (result.status === 200) {
        setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
        toast.success('Appointment cancelled successfully');
      }
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      toast.error('Failed to cancel appointment. Please try again.');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (appointments.length === 0) return <div>No appointments found.</div>;

  return (
    <div>
      <h4>My Appointments</h4><hr />
      {appointments.map((appointment, index) => (
        <div key={index} className="row">
          <div className="col-lg-2">
            <img src={`${SERVER_BASE_URL}/uploads/${appointment.doctorImg}`} alt={appointment.doctorName} />
          </div>
          <div className="col-lg-10 mt-3 space-y-2">
            <p className="font-bold">{appointment.doctorName}</p>
            <p>{appointment.speciality}</p>
            <p className="font-bold">Address:</p>
            <p>{appointment.address1}</p>
            <p>{appointment.address2}</p>
            <div className="flex items-center justify-between font-bold">
              <p>Date & time: <span>{appointment.appointmentDate} | {appointment.appointmentTime}</span></p>
              <button
                className='border border-red-500 text-red-500 font-bold py-2 px-4 rounded hover:bg-red-500 hover:text-white transition duration-300'
                onClick={() => handleCancelAppointment(appointment._id)}
              >
                Cancel appointment
              </button>
            </div>
          </div>
          <hr />
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default MyAppointment;