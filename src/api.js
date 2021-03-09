import axios from 'axios';

const BASE_API_URL = `https://6.react.pages.academy/six-cities`;
const API_TIMEOUT = 5000;

const getApi = () => axios.create({
  baseURL: BASE_API_URL,
  timeout: API_TIMEOUT,
  withCredentials: true
});

export default getApi();
