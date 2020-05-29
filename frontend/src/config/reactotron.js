import Reactotron from "reactotron-react-js";
import { reactotronRedux } from "reactotron-redux";

import reactotronSaga from "reactotron-redux-saga";

const tron = Reactotron.configure({ name: "Frontend Barber Shop" })
  .use(reactotronSaga())
  .use(reactotronRedux())
  .connect();
tron.clear();


console.tron = tron
