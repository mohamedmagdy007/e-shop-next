import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
type TFormData = {
  email: string;
  password: string;
};

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to login");
      }

      const data = await response.json();
      Cookies.set("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue("An unexpected error");
    }
  }
);
export default actAuthLogin;
