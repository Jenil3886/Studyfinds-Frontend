import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false,
	token: null,
};

export const viewToggleSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthToken: (state, { payload }) => {
			state.token = payload;
			state.isLoggedIn = !!payload;
		},
		logout: (state) => {
			state.token = null;
			state.isLoggedIn = false;
		},
	},
});

// Exporting actions
export const { setAuthToken, logout } = viewToggleSlice.actions;

// Exporting reducer
export default viewToggleSlice.reducer;
