import { createSlice } from "@reduxjs/toolkit";

interface ICartItem {
  id: string | number;
  name: string;
  quantity: number;
  sum: number;
  price: number;
}

interface CartState {
  items: ICartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addItemToCart: (state, action) => {
      const existingItem: ICartItem | undefined = state.items.find(
        (item: ICartItem) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.sum += action.payload.price;
        return;
      }

      state.items.push({
        ...action.payload,
        quantity: 1,
        sum: action.payload.price,
      });
    },
    // Remove item from cart
    removeItemFromCart: (state, action) => {
      const existingItem = state.items.find((item) => {
        return item.id === action.payload.id;
      });
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.sum -= action.payload.price;
        return;
      }
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    // Remove product from cart
    removeProductFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    // empty cart
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  removeProductFromCart,
  emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
