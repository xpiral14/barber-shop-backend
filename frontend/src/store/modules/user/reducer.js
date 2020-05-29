import { FETCH_USER_SUCCESS } from "./types";
import produce from "immer";

const INITIAL_STATE = {
  level: 1,
  name: "Samuel Reis",
};
export default function userReducer(state = INITIAL_STATE, action) {
  let { payload } = action;
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return produce(state, (draft) => {
        draft = { ...payload };
      });
    default:
      return state;
  }
}
