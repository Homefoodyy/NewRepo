import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "./actionTypes";

const initialState = [];

export default function cartReducer(state = initialState, { type, payload }) {
  const increaseItems = (payload) => {
    // state.filter((dish) => {
    //   return dish.k_id === payload.k_id;
    // });

    const existingDish = state.find((dish) => {
      return dish.d_id === payload.d_id;
    });
    if (existingDish) {
      existingDish.quantity += 1;
      return existingDish;
    } else {
      state.push(payload);
    }
    return payload;
    // let shoudlPayloadAdd = false;
    // state.map((dish) => {
    //   if (dish.k_id === payload.k_id) {
    //     shoudlPayloadAdd = true;
    //   } else shoudlPayloadAdd = false;
    // });

    // if (shoudlPayloadAdd) {
    //   return payload;
    // } else return state;
  };
  const decreaseItems = (payload) => {
    const existingDish = state.find((dish) => {
      return dish.d_id === payload.d_id;
    });

    console.log(existingDish);
    if (existingDish) {
      existingDish.quantity -= 1;
      return existingDish;
    } else {
      return state.filter((dish) => dish.d_id === payload.d_id);
    }
  };

  switch (type) {
    case ADD_TO_CART:
      return [...state, increaseItems(payload)];
    case REMOVE_FROM_CART:
      return [...state, decreaseItems(payload)];
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
}
