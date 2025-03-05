import { createSlice } from "@reduxjs/toolkit";

const getLocalStorageData = (key, defaultValue) => {
	try {
		const storedData = localStorage.getItem(key);
		return storedData ? JSON.parse(storedData) : defaultValue;
	} catch (error) {
		console.error("Error reading from localStorage:", error);
		return defaultValue;
	}
};

const setLocalStorageData = (key, value) => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.error("Error writing to localStorage:", error);
	}
};

// Initial state
const initialState = {
	likedItemIds: getLocalStorageData("likedItemIds", []), // Load data from localStorage
};

export const dataSlice = createSlice({
	name: "saveData", // Slice name
	initialState,
	reducers: {
		likeItem: (state, { payload }) => {
			if (state.likedItemIds.includes(payload)) {
				state.likedItemIds = state.likedItemIds.filter((li) => li !== payload);
			} else {
				state.likedItemIds = [...state.likedItemIds, payload];
			}
			// Update localStorage whenever the state changes
			setLocalStorageData("likedItemIds", state.likedItemIds);
		},
	},
});

// Exporting actions
export const { likeItem } = dataSlice.actions;

// Exporting reducer
export default dataSlice.reducer;
