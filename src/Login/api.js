import axios from 'axios';

const API = "localhost:8080"

export const LoginApi = (email) => axios.post(API,{email});


