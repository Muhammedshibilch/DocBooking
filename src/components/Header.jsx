import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap"; // Import NavDropdown
import { Link } from "react-router-dom";
import { faHospital } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";
import user from '../assets/user.jpg';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  const checkLoginStatus = () => {
    const token = sessionStorage.getItem("token");
    setIsLogin(!!token); // Set login status based on token presence
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLogin(false);
    window.location.reload(); // Reload the page to refresh state
  };

  return (
    <div>
      <Navbar
        bg="white"
        data-bs-theme="white"
        expand="lg"
        className="w-full border-0 shadow-none bg-white flex items-center"
      >
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon
            icon={faHospital}
            className="text-blue-600"
            style={{ fontSize: "2rem" }}
          />
          <h1 className="text-blue-600 font-bold text-2xl mt-3">DocBooking</h1>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto font-bold flex items-center space-x-4">
            <Nav.Link
              href="/"
              className="text-gray-700 hover:text-black px-3 py-2"
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/doctors"
              className="text-gray-700 hover:text-blue-600 px-3 py-2"
            >
              All Doctors
            </Nav.Link>
            <Nav.Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 px-3 py-2"
            >
              About
            </Nav.Link>
            <Nav.Link
              href="/contact"
              className="text-gray-700 hover:text-blue-600 px-3 py-2"
            >
              Contact
            </Nav.Link>
          </Nav>
          {isLogin ? (
            <NavDropdown title="User" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1"><Link to={'/my-profile'}>My Profile</Link></NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3"><Link to={'/my-appointments'}>My Appointment</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Link
              to={"/register"}
              className="bg-blue-600 text-white px-4 py-2 font-medium no-underline rounded-full ml-2 hover:bg-blue-700 transition duration-200"
            >
              Create Account
            </Link>
          )}
        </Navbar.Collapse>
      </Navbar>
      <hr />
    </div>
  );
};

export default Header;
