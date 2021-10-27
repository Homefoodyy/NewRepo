import { ADD_USER, ADD_ZIP_CODE, REMOVE_USER } from "./actionTypes";

const initialState = {
  email: "",
  c_id: "",
  authenticated: false,
  zip_code: "",
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_USER:
      return {
        ...state,
        ...payload,
      };
    case REMOVE_USER:
      return {
        ...initialState,
      };
    case ADD_ZIP_CODE:
      return {
        ...state,
        zip_code: payload,
      };
    default:
      return state;
  }
}
