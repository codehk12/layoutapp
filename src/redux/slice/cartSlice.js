import { createSlice } from "@reduxjs/toolkit";
import { findIndex } from "lodash";

const initialState = {
  cartItems: [],
  value: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.cartItems.push(action.payload);
    },

    removeCart: (state, action) => {
      const removeItem = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (removeItem !== -1) {
        state.cartItems.splice(removeItem, 1);
        console.log(removeItem);
      }
    },

    increment: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );

      if (itemIndex !== -1) {
        const product = state.cartItems[itemIndex];

        const test = {
          ...product,
          quantity: product?.quantity ? product?.quantity + 1 : 2,
        };

        state.cartItems.splice(itemIndex, 1, test);
      }
    },

    decrement: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );

      if (itemIndex !== -1) {
        const product = state.cartItems[itemIndex];

        const test = {
          ...product,
          quantity: product?.quantity ? product?.quantity - 1 : 2,
        };

        state.cartItems.splice(itemIndex, 1, test);
      }
    },

    // selectCategory: (state, action) => {
    //   const filteredItems = state.cartItems.filter(
    //     (item) => item.category === action.payload
    //   );
    //   console.log("filter items by category", filteredItems);
    //   return {
    //     ...state,
    //     filteredItems: filteredItems,
    //   };
    // },
  },
});

export const { addCart, removeCart, increment, decrement, selectCategory } =
  cartSlice.actions;
export const cart = (state) => state.cart;
export const selectCount = (state) => state.cart.value;

// export const selectCart = (state) => state.cart.value;
export default cartSlice.reducer;
