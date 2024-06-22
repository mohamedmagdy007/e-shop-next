import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import { TCourses } from "@/types/Courses";

// type TResponse = TCourses[];

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);

    if (!itemsId.length) {
      return fulfillWithValue([]);
    }

    try {
      const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join("&");
      const response = await fetch(
        `http://localhost:3001/products?${concatenatedItemsId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        // If the response is not ok (status is not in the range 200-299)
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);

export default actGetProductsByItems;
