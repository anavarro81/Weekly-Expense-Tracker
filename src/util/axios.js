import axios from 'axios';


export const axiosInstance = axios.create({     
    baseURL: import.meta.env.VITE_API_BASE_URL

})

axiosInstance.interceptors.request.use(
  (config) => {

    // 1. Obtenemos el token.     
    const token = localStorage.getItem('authToken');

    // 2. Si el token existe, lo añadimos a la cabecera 'Authorization'
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // 3. ¡MUY IMPORTANTE! Devolvemos la configuración para que la petición continúe.
    return config;
  },
  (error) => {
    // Hacemos algo si hay un error al configurar la petición
    return Promise.reject(error);
  }
);