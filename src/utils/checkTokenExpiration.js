import jwt_decode from "jwt-decode";
import { store } from "../app/store";
import { login } from "../features/authSlice";
import getAccessToken from "./getAccessToken";

// to check we are usuing jwt-decode

const CheckTokenEx = async (token) => {
  const decoded = jwt_decode(token);

  // Check if the token will expire within the next 5 seconds
  const currentTime = Date.now() / 1000;
  if (decoded.exp - currentTime < 5) {
    // Token will expire soon, fetch a new one
    const res = await getAccessToken();
    store.dispatch(login(res.data));
    return res.data.access_token;
  }

  // Token is still valid, return it
  return token;
};

export default CheckTokenEx;
