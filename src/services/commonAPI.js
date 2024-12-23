// filepath: /frontend/src/services/commonAPI.js
import axios from 'axios';

const commomAPI = async (httpMethod, url, reqBody, reqHeader) => {
  const reqConfig = {
    method: httpMethod,
    url,
    data: reqBody,
    headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
  };

  try {
    const response = await axios(reqConfig);
    return response;
  } catch (error) {
    console.error(`Error with ${httpMethod} request to ${url}:`, error);
    throw error;
  }
};

export default commomAPI;