import axios from "axios";

import {
  privateRequestErrorInterceptor,
  privateRequestInterceptor,
} from "./interceptors/private/requestInterceptor";
import {
  errorResponseInterceptor,
  successResponseInterceptor,
} from "./interceptors/shared/responseInterceptor";

const publicService = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api",
  withCredentials: false,
});

const privateService = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api",
  withCredentials: true,
});

privateService.interceptors.request.use(
  privateRequestInterceptor,
  privateRequestErrorInterceptor
);

privateService.interceptors.response.use(
  successResponseInterceptor,
  errorResponseInterceptor
);

publicService.interceptors.response.use(
  successResponseInterceptor,
  errorResponseInterceptor
);

export { publicService, privateService };
