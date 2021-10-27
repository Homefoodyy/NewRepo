import { combineReducers, createStore } from "redux";
import userReducer from "./User/reducer";
import cartReducer from "./Cart/reducer";

const reducer = combineReducers({
  userReducer,
  cartReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
