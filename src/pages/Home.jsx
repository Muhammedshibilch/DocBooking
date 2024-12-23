import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import frontpage from '../assets/frontpage.png';
import derma from '../assets/Dermatologist.svg';
import gastro from '../assets/Gastroenterologist.svg';
import general from '../assets/General_physician.svg';
import gyne from '../assets/Gynecologist.svg';
import neuro from '../assets/Neurologist.svg';
import pedia from '../assets/Pediatricians.svg';
import DoctorCards from '../components/DoctorCards';
import appo from '../assets/appointment_img.png';
import { homeDoctorAPI } from '../services/allAPI';

const Home = () => {
  const [homeDoctors, setHomeDoctors] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  console.log(homeDoctors);

  useEffect(() => {
    getHomeDoctors();
    if (sessionStorage.getItem("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const getHomeDoctors = async () => {
    try {
      const result = await homeDoctorAPI();
      console.log(result);
      if (result.status === 200) {
        setHomeDoctors(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div style={{ width: '100%', height: '500px' }} className='bg-blue-500 rounded-lg'>
        <div className="row">
          <div className="col-lg-6 flex flex-col items-center justify-center text-center h-[450px] space-y-4 ps-5">
            <h2 className='text-white font-extrabold text-[54px]'>Book Appointment with Trusted Doctors</h2>
            {isLogin ? (
              <Link to={'/doctors'} className='bg-white px-4 py-2 text-black font-semibold rounded-lg hover:bg-blue-600 hover:text-white hover:scale-105 transition-transform duration-200'>
                Book appointment &nbsp; <i className="fa-solid fa-arrow-right"></i>
              </Link>
            ) : null}
          </div>
          <div className="col-lg-6"><img className='mt-5' src={frontpage} alt="" /></div>
        </div>
      </div>
      <div className='text-center'>
        <h3 className='mt-5 font-bold'>Find by Speciality</h3>
        <p>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        <div className='flex items-center justify-center space-x-7'>
          <div className='flex flex-col items-center transition-transform transform hover:scale-105 hover:drop-shadow'>
            <img src={derma} width={'100px'} alt="Dermatologist" />
            <p className='mt-2'>Dermatologist</p>
          </div>
          <div className='flex flex-col items-center transition-transform transform hover:scale-105 hover:drop-shadow'>
            <img src={gastro} width={'100px'} alt="Gastroenterologist" />
            <p className='mt-2'>Gastroenterologist</p>
          </div>
          <div className='flex flex-col items-center transition-transform transform hover:scale-105 hover:drop-shadow'>
            <img src={general} width={'100px'} alt="General physician" />
            <p className='mt-2'>General physician</p>
          </div>
          <div className='flex flex-col items-center transition-transform transform hover:scale-105 hover:drop-shadow'>
            <img src={gyne} width={'100px'} alt="Gynecologist" />
            <p className='mt-2'>Gynecologist</p>
          </div>
          <div className='flex flex-col items-center transition-transform transform hover:scale-105 hover:drop-shadow'>
            <img src={neuro} width={'100px'} alt="Neurologist" />
            <p className='mt-2'>Neurologist</p>
          </div>
          <div className='flex flex-col items-center transition-transform transform hover:scale-105 hover:drop-shadow'>
            <img src={pedia} width={'100px'} alt="Pediatricians" />
            <p className='mt-2'>Pediatricians</p>
          </div>
        </div>
      </div>
      <div className='mt-11 text-center'>
        <h3 className='font-semibold mt-5'>Top Doctors To Book</h3>
        <p>Simply browse through our extensive list of trusted doctors.</p>
        <div className="flex overflow-x-auto space-x-4 px-4">
          {homeDoctors.map(doctor => (
            <DoctorCards displayData={doctor} />
          ))}
        </div>
        <Link to={'/doctors'} className='bg-gray-400 text-white px-4 py-2 mt-5 rounded-full inline-block'>More</Link>
      </div>
      <div style={{ width: '100%', height: '465px' }} className='mt-5 bg-blue-500 rounded-lg'>
        <div className="row">
          <div className="col-lg-8 flex flex-col items-center justify-center text-center h-[450px] space-y-4 ps-5">
            <h2 className='text-white font-extrabold text-[54px]'>
              Book Appointment With 100+ Trusted Doctors
            </h2>
            {isLogin ? (
              <Link to={'/doctors'} className='bg-white px-4 py-2 text-black font-semibold rounded-full hover:bg-blue-600 hover:text-white hover:scale-105 transition-transform duration-200'>
                Explore Doctors &nbsp;
              </Link>
            ) : (
              <Link to={'/register'} className='bg-white px-4 py-2 text-black font-semibold rounded-full hover:bg-blue-600 hover:text-white hover:scale-105 transition-transform duration-200'>
                Create account &nbsp;
              </Link>
            )}
          </div>
          <div className="col-lg-4">
            <img src={appo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
