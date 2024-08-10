import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from './apiClient';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await apiClient.get('/api/users');
  return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (user) => {
  const response = await apiClient.post('/api/users', user);
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export default usersSlice.reducer;
