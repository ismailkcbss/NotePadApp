import axios from "axios";
import * as storage from './storage.helper'

const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  baseURL: 'http://localhost:5000',
  withCredentials: true    // Bunu Cookie için yapmamız lazım
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      storage.setKeyWithValue("jwt", "");
      if (window.location.pathname !== '/Login')
        window.location.assign('/Login');

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

const setApiToken = (jwt) => {
  axiosInstance.defaults.headers.common["jwt"] = jwt;
};

export { axiosInstance, setApiToken };