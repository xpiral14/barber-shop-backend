import { USER_TOKEN_REQUEST_SUCCES, USER_TOKEN_REQUEST } from "./types";

export function fetchUserToken({ email, password }) {
  return {
    type: USER_TOKEN_REQUEST,
    payload: {
      email,
      password,
    },
  };
}

export function fetchUserTokenSucces(token) {
  return {
    type: USER_TOKEN_REQUEST_SUCCES,
    payload: {
      token,
    },
  };
}
