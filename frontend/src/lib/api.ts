import axios from 'axios';

// Tạo một instance của Axios với cấu hình mặc định
const api = axios.create({
  baseURL: 'http://your-api-url.com', // Thay thế bằng URL API của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để xử lý request và response
api.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu có
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
    // Xử lý lỗi response (ví dụ: token hết hạn)
    if (error.response.status === 401) {
      // Xử lý đăng xuất hoặc làm mới token
    }
    return Promise.reject(error);
  }
);

export default api;