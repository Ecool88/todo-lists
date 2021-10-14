import axios from "axios";

const BASE_URL = "http://localhost:3000/api/";
axios.defaults.baseURL = BASE_URL;


//todo добавить сообщения при получения от сервера данных пока что через alert эту часть сделал
// потом при миграции на vue 3 toastnotification


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
          alert(e, 'Пользователь не авторизован')
        }
      }
    }
  );
}
