import { privateService, publicService } from ".";

export function getAccessTokenApi() {
  return publicService.get("/user/refresh_token", {
    withCredentials: true,
  });
}

export function loginApi(credentials) {
  return publicService.post("/user/login", credentials, {
    withCredentials: true,
  });
}

export function registerApi(userData) {
  return publicService.post("/user/register", userData, {
    withCredentials: true,
  });
}

export function logoutApi() {
  return privateService.post(`/user/logout`);
}
