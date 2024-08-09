import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    step2Components: [],
    step3Components: [],
  },
  reducers: {
    setComponents: (state, action) => {
      state.step2Components = action.payload.step2Components;
      state.step3Components = action.payload.step3Components;
    },
  },
});

export const { setComponents } = adminSlice.actions;

export default adminSlice.reducer;
