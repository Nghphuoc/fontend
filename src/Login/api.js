import axios from 'axios';

const API = "http://43.201.113.85:8000/user/insert"

export const LoginApi = (user_email) => axios.post(API,{user_email});


