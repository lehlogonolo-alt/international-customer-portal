import axios from 'axios';

const API = axios.create({
  baseURL: 'https://customer-portal-api-e0uz.onrender.com',
});

export default API;
