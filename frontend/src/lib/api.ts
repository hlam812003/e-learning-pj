import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // xuli loi
    if (error.response.status === 401) {
      // xu li dang xuat/lam moi token
    }
    return Promise.reject(error)
  }
)

export default api