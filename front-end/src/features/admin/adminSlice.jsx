import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    step2Components: ["Birthdate", "AboutMe"],
    step3Components: ["Address"],
    availableComponents: ["Birthdate", "AboutMe", "Address"],
  },
  reducers: {
    setStep2Components: (state, action) => {
      state.step2Components = action.payload;
    },
    setStep3Components: (state, action) => {
      state.step3Components = action.payload;
    },
  },
});

export const { setStep2Components, setStep3Components } = adminSlice.actions;

export default adminSlice.reducer;
