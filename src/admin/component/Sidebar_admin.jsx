import React, { useState } from 'react';
import { FaHome, FaCalendarAlt, FaUserPlus, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar_admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={`lg:w-64 w-full h-screen bg-white shadow-md fixed lg:relative transition-all ${isSidebarOpen ? 'left-0' : '-left-64'} lg:left-0`}>
        <div className="flex flex-col h-full">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-4 text-white bg-blue-500 absolute top-4 left-4 rounded-full z-10"
          >
            {isSidebarOpen ? 'Close' : 'Open'}
          </button>
          <ul className="space-y-4 p-4">
          <li className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg">
              <FaUsers size={24} />
              <Link to={'/all-appointment'}><span className="text-sm lg:text-base">All Appointments</span></Link>
            </li>
            <li className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg">
              <FaUserPlus size={24} />
              <Link to={'/add-doctor'}><span className="text-sm lg:text-base">Add Doctor</span></Link>
            </li>
            <li className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg">
              <FaUsers size={24} />
              <Link to={'/all-doctors'}><span className="text-sm lg:text-base">Doctors List</span></Link>
            </li>
          </ul>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black opacity-50 z-5"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar_admin;
