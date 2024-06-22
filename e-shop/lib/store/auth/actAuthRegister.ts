import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
type TFormData = {
  name: string;
  email: string;
  password: string;
};

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const response = await fetch("http://localhost:5005/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to register");
      }

      const data = await response.json();
      Cookies.set("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue("An unexpected error");
    }
  }
);

export default actAuthRegister;
