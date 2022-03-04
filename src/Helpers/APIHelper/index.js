import axios from "axios";

const axiosAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export async function get(url, config = {}) {
  return await axiosAPI
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  return axiosAPI
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(url, data, config = {}) {
  return axiosAPI
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosAPI
    .delete(url, { ...config })
    .then((response) => response.data);
}

export default axiosAPI;
