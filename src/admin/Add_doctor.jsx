import React, { useEffect, useState } from 'react';
import Header_admin from './component/Header_admin';
import Sidebar_admin from './component/Sidebar_admin';
import profile from '../assets/userproflle.jpg';
import { toast, ToastContainer } from 'react-toastify';
import { addDoctorAPI } from '../services/allAPI';

const Add_doctor = () => {
  const [preview, setPreview] = useState("");
  const [uploadFileStatus, setUploadFileStatus] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState({
    doctorName: "", doctorEmail: "", experience: "", address1: "", address2: "", aboutDoctor: "", speciality: "", degree: "", fees: "", doctorImg: ""
  });

  useEffect(() => {
    if (doctorDetails.doctorImg && (doctorDetails.doctorImg.type === "image/png" || doctorDetails.doctorImg.type === "image/jpg" || doctorDetails.doctorImg.type === "image/jpeg")) {
      setUploadFileStatus(true);
      setPreview(URL.createObjectURL(doctorDetails.doctorImg));
    } else {
      setUploadFileStatus(false);
      setDoctorDetails({ ...doctorDetails, doctorImg: "" });
    }
  }, [doctorDetails.doctorImg]);

  const handleAddDoctor = async () => {
    const { doctorName, doctorEmail, experience, address1, address2, aboutDoctor, speciality, degree, fees, doctorImg } = doctorDetails;
    if (doctorName && doctorEmail && experience && address1 && address2 && aboutDoctor && speciality && degree && fees && doctorImg) {
      const reqBody = new FormData();
      reqBody.append("doctorName", doctorName);
      reqBody.append("doctorEmail", doctorEmail);
      reqBody.append("experience", experience);
      reqBody.append("address1", address1);
      reqBody.append("address2", address2);
      reqBody.append("aboutDoctor", aboutDoctor);
      reqBody.append("speciality", speciality);
      reqBody.append("degree", degree);
      reqBody.append("fees", fees);
      reqBody.append("doctorImg", doctorImg);

      const reqHeader = {
        "Content-Type": "multipart/form-data"
      };

      try {
        const result = await addDoctorAPI(reqBody, reqHeader);
        if (result.status === 200) {
          toast.success(`${result?.data?.doctorName} uploaded successfully`);
        } else {
          if (result.response.status === 406) {
            toast.info(result.response.data);
          }
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      toast.info("Please fill the form completely!!", { autoClose: 8000 });
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
          <div className="p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Add Doctor</h2>
            <form className="space-y-4">
              {/* Profile Image Upload */}
              <div className="flex items-center space-x-6 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <label>
                    <input
                      onChange={e => setDoctorDetails({ ...doctorDetails, doctorImg: e.target.files[0] })}
                      type="file"
                      name=""
                      id=""
                      style={{ display: 'none' }}
                    />
                    <img
                      src={preview ? preview : profile}
                      alt="Profile"
                      className="rounded-full w-16 h-16"
                    />
                  </label>
                </div>
                {!uploadFileStatus && (
                  <div className="text-yellow-300 text-xs">*Upload only the following file types (jpeg, jpg, png) here!!!</div>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Doctor Name</label>
                  <input
                    value={doctorDetails.doctorName}
                    onChange={e => setDoctorDetails({ ...doctorDetails, doctorName: e.target.value })}
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Speciality</label>
                  <select
                    value={doctorDetails.speciality}
                    onChange={e => setDoctorDetails({ ...doctorDetails, speciality: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Speciality</option>
                    <option value="General physician">General physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatricians">Pediatricians</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">Gastroenterologist</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Doctor Email</label>
                  <input
                    value={doctorDetails.doctorEmail}
                    onChange={e => setDoctorDetails({ ...doctorDetails, doctorEmail: e.target.value })}
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Degree</label>
                  <input
                    value={doctorDetails.degree}
                    onChange={e => setDoctorDetails({ ...doctorDetails, degree: e.target.value })}
                    type="text"
                    placeholder="Degree"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Experience</label>
                  <input
                    value={doctorDetails.experience}
                    onChange={e => setDoctorDetails({ ...doctorDetails, experience: e.target.value })}
                    type="text"
                    placeholder="Experience (e.g., 1 Year)"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Fees</label>
                  <input
                    value={doctorDetails.fees}
                    onChange={e => setDoctorDetails({ ...doctorDetails, fees: e.target.value })}
                    type="text"
                    placeholder="Doctor fees"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Address and About Doctor Fields */}
                <div className="col-span-2">
                  <label className="block text-gray-700">Address</label>
                  <input
                    value={doctorDetails.address1}
                    onChange={e => setDoctorDetails({ ...doctorDetails, address1: e.target.value })}
                    type="text"
                    placeholder="Address 1"
                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    value={doctorDetails.address2}
                    onChange={e => setDoctorDetails({ ...doctorDetails, address2: e.target.value })}
                    type="text"
                    placeholder="Address 2"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">About Doctor</label>
                  <textarea
                    value={doctorDetails.aboutDoctor}
                    onChange={e => setDoctorDetails({ ...doctorDetails, aboutDoctor: e.target.value })}
                    placeholder="Write about the doctor..."
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                  ></textarea>
                </div>
              </div>

              <button
                onClick={handleAddDoctor}
                type="button"
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
              >
                Add Doctor
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={8000} />
    </>
  );
};

export default Add_doctor;
