import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: "",
};

export const viewToggleSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, { payload }) => {
      state.token = payload;
      state.isLoggedIn = !!payload;
    },
  },
});

// Exporting actions
export const { setAuthToken } = viewToggleSlice.actions;

// Exporting reducer
export default viewToggleSlice.reducer;
