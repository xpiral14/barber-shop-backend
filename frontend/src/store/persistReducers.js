import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export default (reducers) => {
  const persistestReducer = persistReducer(
    {
      key: "root",
      storage,
      whitelist: ["auth"],
    },
    reducers
  );

  return persistestReducer;
};
