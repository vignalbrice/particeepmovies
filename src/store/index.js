import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import app from "./reducers/app";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const config = {
  key: "app",
  storage: storage,
};

const store = createStore(
  persistReducer(config, app),
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);
export default { store, persistor };
