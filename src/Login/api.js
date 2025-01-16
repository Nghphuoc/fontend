import axios from 'axios';

const API = "http://43.201.113.85:8000/user/insert"

// export const LoginApi = (user_email) => axios.post(API,{user_email});


export const LoginApi = async (user_email) => {
  try {
    const response = await axios.post(API, { user_email });
    return response.data; // Return the data from the API response
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred while logging in');
  }
};