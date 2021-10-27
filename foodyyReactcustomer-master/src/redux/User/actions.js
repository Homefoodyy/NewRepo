import jwt from "jsonwebtoken";
import { ADD_USER, ADD_ZIP_CODE, REMOVE_USER } from "./actionTypes";

export const addUser = (email, token, authenticated, zip_code) => {
  localStorage.setItem("food-app-token", token);
  const decoded = jwt.decode(token);
  localStorage.setItem("food-app-user-id", decoded?.user?.c_id);
  const user = {
    email,
    c_id: decoded?.user?.c_id,
    authenticated,
    zip_code: zip_code,
  };
  return {
    type: ADD_USER,
    payload: user,
  };
};

export const removeUser = () => {
  localStorage.removeItem("food-app-token");
  return {
    type: REMOVE_USER,
  };
};

export const addZipCode = (payload) => {
  localStorage.setItem("food-app-zip-code", payload);
  return {
    type: ADD_ZIP_CODE,
    payload,
  };
};
