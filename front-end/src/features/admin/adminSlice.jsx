import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../apiClient";

export const fetchComponentConfig = createAsyncThunk(
  "admin/fetchComponentConfig",
  async () => {
    const response = await apiClient.get("/admin/components");
    return response.data;
  }
);

export const submitComponentConfig = createAsyncThunk(
  "admin/submitComponentConfig",
  async (_, { getState }) => {
    const { step2Components, step3Components } = getState().admin;
    const config = [
      ...step2Components.map((component, index) => ({
        componentName: component,
        pageNumber: 2,
        position: index + 1,
      })),
      ...step3Components.map((component, index) => ({
        componentName: component,
        pageNumber: 3,
        position: index + 1,
      })),
    ];
    await apiClient.post("/admin/components/batchUpdate", config);
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    step2Components: [],
    step3Components: [],
    availableComponents: ["Birthdate", "AboutMe", "Address"],
    loading: false,
    error: null,
  },
  reducers: {
    setStep2Components: (state, action) => {
      state.step2Components = action.payload;
    },
    setStep3Components: (state, action) => {
      state.step3Components = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComponentConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComponentConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.step2Components = action.payload
          .filter((config) => config.pageNumber === 2)
          .map((config) => config.componentName);
        state.step3Components = action.payload
          .filter((config) => config.pageNumber === 3)
          .map((config) => config.componentName);
      })
      .addCase(fetchComponentConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setStep2Components, setStep3Components } = adminSlice.actions;

export default adminSlice.reducer;
