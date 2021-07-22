import axios from "axios";

const BASE_URL = "http://localhost:3000/api/";
axios.defaults.baseURL = BASE_URL;

//todo есть баг когда время токена истекает и я добавляю новую задачу она сохранятется 3 раза собственно появляются 3 одинаковые задачи
export default function setup() {
  axios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async function(error) {
      const originalRequest = error.config;
      if (error.response.status == 403 && !originalRequest._retry) {
        try {
          originalRequest._retry = true;
          const response = await axios.post(`auth/refresh`, { refreshToken: localStorage.getItem("refreshToken") })
          localStorage.setItem("accessToken", response.data.accessToken);
          return axios(originalRequest)
        } catch (e) {
          alert(e, 'Not auth user')
        }
      }
    }
  );
}
