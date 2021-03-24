import axios from 'axios';
import {HttpCode, ApiConfig} from './const.js';

const getApi = () => {
  const api = axios.create({
    baseURL: ApiConfig.BASE_URL,
    timeout: ApiConfig.TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response) => response;

  const onFail = (error) => {
    const {response} = error;
    if (response.status === HttpCode.UNAUTHORIZED) {
      // Бросаем ошибку, потому что нам важно прервать цепочку промисов после запроса авторизации.
      // Запрос авторизации — это особый случай и важно дать понять приложению, что запрос был неудачным.
      throw error;
    }
    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default getApi;
