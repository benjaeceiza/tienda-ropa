import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // La URL base de tu backend
  withCredentials: true // El pase VIP para que viajen las cookies seguras
});

export default instance;