import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const Header_admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <Navbar bg="white" expand="lg" className="w-full border-0 shadow-none bg-white">
        <Container fluid>
          <Navbar.Brand className='flex items-center space-x-2'>
            <FontAwesomeIcon icon={faHospital} className="text-blue-600" style={{ fontSize: '2rem' }} />
            <h1 className='text-blue-600 font-bold text-2xl'>DocBooking</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="flex justify-between items-center w-100">
            <p className='border rounded-full p-1 text-xs sm:text-base'>Admin Panel</p>
            <button
              className='ms-auto bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out'
              onClick={handleLogout}
            >
              Logout
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header_admin;
