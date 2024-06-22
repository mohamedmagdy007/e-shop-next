import { createAsyncThunk } from "@reduxjs/toolkit";

const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(
        `http://localhost:3001/wishlist?userId=1&productId=${id}`
      );
      const isRecordExist = await response.json();

      if (isRecordExist.length > 0) {
        await fetch(`http://localhost:3001/wishlist/${isRecordExist[0].id}`, {
          method: "DELETE",
        });
        return { type: "remove", id };
      } else {
        await fetch("http://localhost:3001/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: 1,
            productId: id,
          }),
        });
        return { type: "add", id };
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

export default actLikeToggle;
