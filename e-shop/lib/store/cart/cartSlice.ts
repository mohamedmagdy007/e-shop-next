import { createSlice } from "@reduxjs/toolkit";
type TLoading = "idle" | "pending" | "succeeded" | "failed";
import {
  getCartTotalQuantitySelector,
  itemQuantityAvailabilityCheckingSelector,
} from "./selectors";
import { TProduct } from "@/types/Products";
import actGetProductsByItems from "./actGetProductsByItems";
import { authLogout } from "../auth/authSlice";
interface ICartState {
  items: { [key: number]: number };
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
}

const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    cartItemRemove: (state, action) => {
      delete state.items[action.payload];
      state.productsFullInfo = state.productsFullInfo.filter(
        (el) => el.id !== action.payload
      );
    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    cleanCartProductsFullInfo: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    builder.addCase(authLogout, (state) => {
      state.items = [];
      state.productsFullInfo = [];
    });
  },
});
export {
  getCartTotalQuantitySelector,
  itemQuantityAvailabilityCheckingSelector,
  actGetProductsByItems,
};
export const {
  addToCart,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductsFullInfo,
} = cartSlice.actions;
export default cartSlice.reducer;
