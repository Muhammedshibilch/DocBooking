import React, { useEffect, useState } from 'react';
import Header_admin from './component/Header_admin';
import Sidebar_admin from './component/Sidebar_admin';
import { getAllAppointmentsForAdminAPI, deleteAppointmentAPI } from '../services/allAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const All_appointment = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Function to fetch appointments
  const fetchAppointments = async () => {
    try {
      const result = await getAllAppointmentsForAdminAPI();
      if (result.status === 200) {
        setAppointments(result.data);
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      toast.error('Failed to fetch appointments. Please try again later.');
    }
  };

  // Function to delete an appointment
  const handleDeleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        const result = await deleteAppointmentAPI(id);
        if (result.status === 200) {
          setAppointments(appointments.filter(appointment => appointment._id !== id));
          toast.success('Appointment deleted successfully');
        }
      } catch (err) {
        console.error('Error deleting appointment:', err);
        toast.error('Failed to delete appointment. Please try again later.');
      }
    }
  };

  return (
    <>
      <Header_admin />
      <div className="row">
        <div className="col-lg-3">
          <Sidebar_admin />
        </div>
        <div className="col-lg-9">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Appointments</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">#</th>
                  <th className="border border-gray-300 px-4 py-2">Patient</th>
                  <th className="border border-gray-300 px-4 py-2">Date & Time</th>
                  <th className="border border-gray-300 px-4 py-2">Doctor</th>
                  <th className="border border-gray-300 px-4 py-2">Speciality</th>
                  <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appointment, index) => (
                    <tr key={appointment._id}>
                      <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                      <td className="border border-gray-300 px-4 py-2">{appointment.userId?.username || 'N/A'}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {appointment.appointmentDate} {appointment.appointmentTime}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{appointment.doctorName}</td>
                      <td className="border border-gray-300 px-4 py-2">{appointment.speciality}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                          onClick={() => handleDeleteAppointment(appointment._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default All_appointment;
