import { produce } from "immer";
import { SIGN_IN_SUCCESS, USER_TOKEN_REQUEST_SUCCES } from "./types";
const INITIAL_STATE = {
  token: "asdasdas",
  signed: false,
};
export default function authReducer(state = INITIAL_STATE, action) {
  let { payload } = action;

  const reducer = {
    [USER_TOKEN_REQUEST_SUCCES]: () =>
      produce(state, (draft) => {
        draft.token = payload.token;
        draft.signed = true;
      }),
  };
  return reducer[action.type] ? reducer[action.type]() : state;
}
