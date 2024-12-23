import React from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import About from './pages/About';
import Contact from './pages/Contact';
import Myprofile from './pages/Myprofile';
import MyAppointment from './pages/MyAppointment';
import Appointment from './pages/Appointment';
import Footer from './components/Footer';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './pages/Auth';
import Add_doctor from './admin/Add_doctor';
import All_doctors from './admin/All_doctors';

const App = () => {
  const location = useLocation();
  const noHeaderFooterRoutes = ['/add-doctor', '/admin-dashboard', '/all-appointment', '/all-doctors'];

  return (
    <>
      <div style={{ padding: '0px 100px' }}>
        {!noHeaderFooterRoutes.includes(location.pathname) && <Header />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Auth />} />
          <Route path='/register' element={<Auth insideRegister={true} />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-profile' element={<Myprofile />} />
          <Route path='/my-appointments' element={<MyAppointment />} />
          <Route path='/appointment/:_id' element={<Appointment />} />
          <Route path='/add-doctor' element={<Add_doctor />} />
          <Route path='/all-doctors' element={<All_doctors />} />
        </Routes>
        {!noHeaderFooterRoutes.includes(location.pathname) && <Footer />}
      </div>
    </>
  );
};

export default App;
