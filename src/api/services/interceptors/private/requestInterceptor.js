import { store } from "../../../../app/store";
import CheckTokenEx from "../../../../utils/checkTokenExpiration";

export async function privateRequestInterceptor(config) {
  // Modify the request configuration here

  const access_token = store.getState().authUser.access_token;

  // if not access token throw error with message
  if (!access_token) {
    throw new Error("No access token found");
  }

  const validatedToken = await CheckTokenEx(access_token);

  config.headers.Authorization = `Bearer ${validatedToken}`;

  return config;
}

export function privateRequestErrorInterceptor(error) {
  // Handle any request error here
  return Promise.reject(error);
}
