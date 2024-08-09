import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/adminSlice";
import usersReducer from "../features/users/usersSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    users: usersReducer,
  },
});

export default store;
