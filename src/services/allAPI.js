import axios from "axios";
import commomAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverUrl";

// registerAPI
export const registerAPI = async (reqBody) => {
  return await commomAPI("POST", `${SERVER_BASE_URL}/register`, reqBody);
};
// loginAPI
export const loginAPI = async (reqBody) => {
  return await commomAPI("POST", `${SERVER_BASE_URL}/login`, reqBody);
};
// add-doctor
export const addDoctorAPI = async (reqBody, reqHeader) => {
  return await commomAPI(
    "POST",
    `${SERVER_BASE_URL}/add-doctors`,
    reqBody,
    reqHeader
  );
};

// home doctor
export const homeDoctorAPI = async () => {
  return await commomAPI("GET", `${SERVER_BASE_URL}/home-doctors`, {});
};

// all doctor
export const allDoctorAPI = async () => {
  return await commomAPI("GET", `${SERVER_BASE_URL}/all-doctors`, {});
};
// /get single doctor
export const singleDoctorAPI = async (_id) => {
  return await commomAPI("GET", `${SERVER_BASE_URL}/appointment/${_id}`, {});
};
// create appointment
export const createAppointmentAPI = async (appointmentDetails) => {
  try {
    const response = await axios.post(
      `${SERVER_BASE_URL}/create-appointment`,
      appointmentDetails,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};
// get all appointments
export const getAllAppointmentsAPI = async (userId) => {
  try {
    const response = await axios.get(`${SERVER_BASE_URL}/appointments`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      params: { userId },
    });
    return response;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

// delete appointment
export const cancelAppointmentAPI = async (appointmentId) => {
  try {
    const response = await axios.delete(
      `${SERVER_BASE_URL}/appointments/${appointmentId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    throw error;
  }
};

// delete doctor
// export const deleteDoctorAPI = async (doctorId) => {
//   return await commomAPI("DELETE", `${SERVER_BASE_URL}/doctors/${doctorId}`, {}, {
//     Authorization: `Bearer ${sessionStorage.getItem('token')}`,
//   });
// };





// Delete doctor
export const deleteDoctorAPI = async (doctorId) => {
  const adminToken = sessionStorage.getItem("admin_token") || sessionStorage.getItem("token"); // Use admin token if available
  console.log('Admin Token:', adminToken); // Debug log
  return await commomAPI("DELETE", `${SERVER_BASE_URL}/doctors/${doctorId}`, null, {
    'Authorization': `Bearer ${adminToken}`
  });
};



// edit
export const updateUserAPI = async (userId, userDetails) => {
  return await commomAPI(
    "PUT",
    `${SERVER_BASE_URL}/user/${userId}`,
    userDetails,
    {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    }
  );
};

// Fetch all appointments for admin

export const getAllAppointmentsForAdminAPI = async () => {
  try {
    const response = await axios.get(`${SERVER_BASE_URL}/appointmentss`);
    return response;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

// Delete an appointment
// export const deleteAppointmentAPI = async (id) => {
//   return await commomAPI("DELETE",`${SERVER_BASE_URL}/appointments/${id}`);
// };


// Delete an appointment
export const deleteAppointmentAPI = async (id) => {
  const token = sessionStorage.getItem('admin_token') || sessionStorage.getItem('token'); // Use admin token if available
  return await commomAPI("DELETE", `${SERVER_BASE_URL}/appointments/${id}`, null, {
    'Authorization': `Bearer ${token}`
  });
};
