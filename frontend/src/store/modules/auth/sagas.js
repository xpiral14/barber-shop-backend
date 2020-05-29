import { put, call, all, /* takeEvery */ takeLatest } from "redux-saga/effects";
import api from "../../../services/api";
import history from "../../../services/history";
import { toast } from "react-toastify";
import { fetchUserTokenSucces } from "./actions";
import { USER_TOKEN_REQUEST } from "./types";


function* fetchUser({ payload }) {
  try {
    const { data } = yield call(api.post, "/session/user", {
      email: payload.email,
      password: payload.password,
    });
    
    let {token, user} = data

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(
      fetchUserTokenSucces(token)
    );
    yield history.push("/dashboard")
  } catch (error) {
    let errors = error.response.data.join("\n");
    yield toast.error(errors);
  }
}

//fetch answers
export default all([
  takeLatest(USER_TOKEN_REQUEST, fetchUser),
]);
