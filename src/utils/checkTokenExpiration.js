import jwt_decode from "jwt-decode";
import axios from "axios";
import { login } from "../features/authSlice";

// to check we are usuing jwt-decode

export const CheckTokenEx = async (token, dispatch) => {
  const decoded = jwt_decode(token);

  // jwt expire o illayo endu check panra
  // expire illatti return panra  ,, expire enda request ondu anuppura access token a edukka
  if (decoded.exp >= Date.now() / 1000) return token;

  const res = await axios.get("/api/user/refresh_token");

  dispatch(login(res.data));

  //   dispatch({ type: "AUTH", payload: res.data });

  return res.data.access_token;
};
