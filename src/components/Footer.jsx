import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <MDBFooter bgColor='white' className='text-center text-lg-start text-muted mt-5'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <div className='d-flex align-items-center mb-3'>
                <FontAwesomeIcon icon={faHospital} className="text-blue-600" style={{ fontSize: '2rem' }} />
                <h1 className='text-blue-600 font-bold text-2xl ms-2'>DocBooking</h1>
              </div>
              <p>
                Effortlessly book your doctor's appointment anytime, anywhere, and receive immediate confirmation.
                Experience seamless access to top healthcare professionals with our user-friendly platform.
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-black fw-bold mb-4'>Company</h6>
              <p>
                <a href='/' className='text-reset'>
                  Home
                </a>
              </p>
              <p>
                <a href='/about' className='text-reset'>
                  About
                </a>
              </p>
              <p>
                <a href='/doctors' className='text-reset'>
                  Doctors
                </a>
              </p>
              <p>
                <a href='/contact' className='text-reset'>
                  Contact
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-black fw-bold mb-4'>Get In Touch</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Kannur, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                DocBooking@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> +91 7510702634
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'white' }}>
        © 2021 Copyright:
        <a className='text-reset fw-bold' href=''>
          DocBooking
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
