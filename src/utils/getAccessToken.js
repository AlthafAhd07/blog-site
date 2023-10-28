import { getAccessTokenApi } from "../api/authApi";

let refreshTokenPromise = null;

async function getAccessToken() {
  if (!refreshTokenPromise) {
    // Create a new promise to fetch the access token
    refreshTokenPromise = getAccessTokenApi();
  }

  // Wait for the ongoing refresh token promise to finish
  try {
    return await refreshTokenPromise;
  } finally {
    refreshTokenPromise = null; // Reset the promise to allow new requests
  }
}

export default getAccessToken;
