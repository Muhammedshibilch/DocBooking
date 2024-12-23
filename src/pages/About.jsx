import React from 'react'
import aboutimg from '../assets/about_image.png'

const About = () => {
  return (
    <div style={{height:"125vh"}}>
      <center>
        <h3 className='text-gray-500 mt-5'>ABOUT <span className='text-black'>US</span></h3>
        <div className="row" style={{textAlign:'start'}}>
          <div className="col-lg-4"><img src={aboutimg}  alt="" /></div>
          <div className="col-lg-6 mt-3" ><p>Welcome to DocBooking, your trusted partner in managing your healthcare needs conveniently and efficiently. At DocBooking, we understand the challenges  individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>DocBooking is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, DocBooking is here to support you every step of the way.</p>
          <h4 className='font-bold'>OUR VISION</h4>
          <p>Our vision at DocBooking is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
          </div>
          <div className="col-lg-2"></div>
          
        </div>
      </center>
      <div className='mt-14'>
      <h3>WHY <span className='text-black font-extrabold'>CHOOSE US</span></h3>
      <div className="row mt-4">
  <div className="col-lg-4 flex flex-col justify-center items-center text-center space-y-2 group hover:bg-blue-500" style={{border: '0.1px solid black', height: '230px'}}>
    <h5 className="font-bold group-hover:text-white cursor-pointer">EFFICIENCY:</h5>
    <p className="text-gray-600 group-hover:text-white cursor-pointer">Streamlined appointment scheduling that fits into your busy lifestyle.</p>
  </div>

  <div className="col-lg-4 flex flex-col justify-center items-center text-center space-y-2 group hover:bg-blue-500" style={{border: '0.1px solid black', height: '230px'}}>
    <h5 className="font-bold group-hover:text-white cursor-pointer">CONVENIENCE:</h5>
    <p className="text-gray-600 group-hover:text-white cursor-pointer">Access to a network of trusted healthcare professionals in your area.</p>
  </div>

  <div className="col-lg-4 flex flex-col justify-center items-center text-center space-y-2 group hover:bg-blue-600" style={{border: '0.1px solid black', height: '230px'}}>
    <h5 className="font-bold group-hover:text-white cursor-pointer">PERSONALIZATION:</h5>
    <p className="text-gray-600 group-hover:text-white cursor-pointer">Tailored recommendations and reminders to help you stay on top of your health.</p>
  </div>
</div>





      </div>
    </div>
  )
}

export default About