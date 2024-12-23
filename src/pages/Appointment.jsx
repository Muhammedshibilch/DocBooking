// filepath: /frontend/src/pages/Appointment.jsx
import React, { useState, useEffect } from 'react';
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { useParams, useNavigate } from 'react-router-dom';
import { singleDoctorAPI, createAppointmentAPI } from '../services/allAPI';
import SERVER_BASE_URL from '../services/serverUrl';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const Appointment = () => {
  const { _id } = useParams(); 
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [weekDays, setWeekDays] = useState([]);
  const [timeSlots] = useState([
    "04:30 pm", "05:00 pm", "05:30 pm", "06:00 pm", "06:30 pm", "07:00 pm", "07:30 pm", "08:00 pm"
  ]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fetch doctor details
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const result = await singleDoctorAPI(_id);
        if (result.status === 200) {
          setDoctor(result.data);
        }
      } catch (err) {
        console.error('Error fetching doctor details:', err);
      }
    };
    fetchDoctor();
  }, [_id]);

  // Generate the week days for date selection
  useEffect(() => {
    const generateWeekDates = () => {
      const today = new Date();
      const daysArray = [];
      for (let i = 0; i < 7; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        const dayLabel = futureDate.toLocaleDateString('en-US', { weekday: 'short' });
        const dayDate = futureDate.getDate();
        daysArray.push({ label: `${dayLabel} ${dayDate}` });
      }
      setWeekDays(daysArray);
      setSelectedDate(daysArray[0].label);
    };
    generateWeekDates();
  }, []);

  if (!doctor) return <div>Loading...</div>;

  const handleBookAppointment = async () => {
    const user = JSON.parse(sessionStorage.getItem("users"));
    if (!user) {
      toast.error('Please log in to book an appointment.');
      navigate('/login');
      return;
    }

    const userId = user._id; 
    
    if (selectedDate && selectedTime) {
      const appointmentDetails = {
        userId, 
        doctorImg: doctor.doctorImg,
        speciality: doctor.speciality,
        doctorName: doctor.doctorName,
        address1: doctor.address1,
        address2: doctor.address2,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
      };
  
      try {
        const result = await createAppointmentAPI(appointmentDetails);
        if (result.status === 201) {
          // Show success toast
          toast.success('Appointment booked successfully!');
          navigate('/my-appointments');
        }
      } catch (err) {
        setErrorMessage('Failed to book appointment. Please try again.');
        // Show error toast
        toast.error('Failed to book appointment. Please try again.');
        console.error(err);
      }
    } else {
      setErrorMessage('Please select both a date and time for your appointment.');
      toast.error('Please select both a date and time.');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="row">
        <div className="col-lg-3">
          <div style={{ border: '1px solid black', width: '100%', height: '330px' }} className='bg-blue-500 rounded flex items-center justify-center'>
            <img src={`${SERVER_BASE_URL}/uploads/${doctor.doctorImg}`} className='max-h-full max-w-full' alt="Doctor" />
          </div>
        </div>
        <div className="col-lg-9">
          <div style={{ width: '100%', height: '330px', border: '1px solid black' }} className='rounded p-5'>
            <div className='flex items-center'>
              <h2 className='font-bold'>{doctor.doctorName}</h2>
              <RiVerifiedBadgeLine className='ml-2' />
            </div>
            <div className='mt-3'>
              <p className='font-semibold'>{doctor.degree} <span style={{ border: '1px solid black', borderRadius: '20px' }} className='p-1'>{doctor.experience}</span></p>
              <p className='font-bold mt-4'>About:</p>
              <p>{doctor.aboutDoctor}</p>
              <p className='mt-4'>Appointment fee: <span className='font-bold'>{doctor.fees}</span></p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-3"></div>
        <div className="col-lg-9">
          <h3 className="mb-4">Booking Slots</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white border rounded-lg">
              <h4 className="mb-2">Select Date</h4>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {weekDays.map((day, index) => (
                  <button
                    key={index}
                    className={`p-2 rounded-lg ${selectedDate === day.label ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSelectedDate(day.label)}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 bg-white border rounded-lg">
              <h4 className="mb-2">Select Time</h4>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((time, index) => (
                  <button
                    key={index}
                    className={`p-2 rounded-lg ${selectedTime === time ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {errorMessage && <div className="text-red-500 mt-3">{errorMessage}</div>}
          <button onClick={handleBookAppointment} className='bg-blue-500 text-white px-4 py-2 mt-5 rounded-full'>
            Book an appointment
          </button>
        </div>
      </div>
      <ToastContainer /> {/* Toast container for displaying notifications */}
    </div>
  );
};

export default Appointment;