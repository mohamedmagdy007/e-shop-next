import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { TProduct } from "@/types/Products";

type TDataType = "productsFullInfo" | "ProductIds";

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const response = await fetch(
        `http://localhost:3001/wishlist?userId=${auth.user?.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }
      const userWishlist = await response.json();

      if (!userWishlist.length) {
        return { data: [], dataType: "empty" };
      }

      if (dataType === "ProductIds") {
        const concatenatedItemsId = userWishlist.map((el: any) => el.productId);
        return { data: concatenatedItemsId, dataType: "productsIds" };
      } else {
        const concatenatedItemsId = userWishlist
          .map((el: any) => `id=${el.productId}`)
          .join("&");

        const productResponse = await fetch(`/products?${concatenatedItemsId}`);
        if (!productResponse.ok) {
          throw new Error("Failed to fetch products");
        }
        const products = await productResponse.json();
        return { data: products, dataType: "ProductsFullInfo" };
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);

export default actGetWishlist;
