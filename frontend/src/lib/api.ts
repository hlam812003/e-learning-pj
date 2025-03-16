import axios from 'axios';

// tao mot instance cua axios voi cau hinh mac dinh
const api = axios.create({
  baseURL: 'http://your-api-url.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// them interceptor de xu li request va respond
api.interceptors.request.use(
  (config) => {
    // them token vao header
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // xuli loi
    if (error.response.status === 401) {
      // xu li dang xuat/lam moi token
    }
    return Promise.reject(error);
  }
);

export default api;