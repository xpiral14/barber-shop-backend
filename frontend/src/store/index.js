import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import persistReducers from "./persistReducers";
import createSagaMiddleware from "redux-saga";
import '../config/reactotron'
import rootSaga from "./modules/rootSaga";
import rootReducer from "./modules/rootReducer";

const sagaMonitor =
  process.env.NODE_ENV === "development"
    ? console.tron.createSagaMonitor()
    : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

export const store = createStore(
  persistReducers(rootReducer),
  applyMiddleware(sagaMiddleware)
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
