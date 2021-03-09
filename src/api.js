import axios from 'axios';

const BASE_API_URL = `https://6.react.pages.academy/six-cities`;
const API_TIMEOUT = 5000;

const apiRoute = {
  get: {
    login: `/login`,
    offers: `/hotels`,
    offersNear: (offerId) => `/hotels/${offerId}/nearby`,
    reviews: (offerId) => `/comments/${offerId}`,
    logout: `/logout`
  },
  post: {
    login: `/login`,
  }
};

const HttpCode = {
  OK: 200,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404
};

const getApi = () => {
  const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: API_TIMEOUT,
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

export {apiRoute};
export default getApi;
