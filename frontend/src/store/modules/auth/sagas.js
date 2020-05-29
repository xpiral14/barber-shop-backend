import { put, call, all, /* takeEvery */ takeLatest } from "redux-saga/effects";
import api from "../../../services/api";
import history from "../../../services/history";
import { toast } from "react-toastify";
import { fetchUserTokenSucces } from "./actions";
import { USER_TOKEN_REQUEST } from "./types";
import { fetchUserSuccess } from "../user/actions";
import { CLIENT, EMPLOYEE } from "../../../constants/userLevel";

function* fetchUser({ payload }) {
  const defaultLevelRoute = {
    [EMPLOYEE]: "/appointments",
    [CLIENT]: "/makeAppointment",
  };
  try {
    const { data } = yield call(api.post, "/session/user", {
      email: payload.email,
      password: payload.password,
    });

    let { token, user } = data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(fetchUserTokenSucces(token));
    yield put(fetchUserSuccess(user));

    yield history.push(defaultLevelRoute[data.user.userType.id]);
  } catch (error) {
    let errors = error.response.data.join("\n");
    yield toast.error(errors);
  }
}

function setToken({ payload }) {
  if (!payload) return;

  let { token } = payload.auth;
  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
}
//fetch answers
export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest(USER_TOKEN_REQUEST, fetchUser),
]);
