import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import contactImg from '../assets/contact.jpg';

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div style={{ height: '60vh' }}>
      <center>
        <h3 className='mt-5 text-gray-600'>CONTACT <span className='text-black'>US</span></h3>
        <div className="row mt-5">
          <div className="col-lg-2"></div>
          <div 
               data-aos="fade-right"
               data-aos-offset="300"
               data-aos-easing="ease-in-sine"
               className="col-lg-4">
            <img src={contactImg} alt="" />
          </div>
          <div className="col-lg-3">
            <h5 className='font-bold'>OUR OFFICE</h5>
            <p className='text-gray-500'>
              670018, DocBooking<br />
              New York, Washington, USA
            </p>
            <br />
            <p>Tel : +91 7510702634</p>
            <p>Email: DocBooking@gmail.com</p>
            <div className='flex' data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="300"
     data-aos-offset="0">
              <input
                type="text"
                placeholder="Enter Your Email here"
                className="form-control me-2"
              />
              <button className="btn btn-info">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </center>
    </div>
  );
}

export default Contact;
