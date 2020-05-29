import { FETCH_USER_SUCCESS } from "./types";

export function fetchUserSuccess(user) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: {
      user,
    },
  };
}
