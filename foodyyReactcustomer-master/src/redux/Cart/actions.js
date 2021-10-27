import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "./actionTypes";

export const addItemToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};
export const removeItemToCart = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
