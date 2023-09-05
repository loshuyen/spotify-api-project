import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: ''
};

export const fetchUser = createAsyncThunk(
    'fetch_user',async () => {
      const response = await axios.get('/auth/current_user');
      return response.data
    }
  );

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
    }
  });
  
export default authSlice.reducer;