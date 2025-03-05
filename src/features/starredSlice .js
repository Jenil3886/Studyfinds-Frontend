import { createSlice } from "@reduxjs/toolkit";

// Utility function to get data from localStorage
const getLocalStorageData = (key, defaultValue) => {
	try {
		const storedData = localStorage.getItem(key);
		return storedData ? JSON.parse(storedData) : defaultValue;
	} catch (error) {
		console.error("Error reading from localStorage:", error);
		return defaultValue;
	}
};

// Utility function to set data to localStorage
const setLocalStorageData = (key, value) => {
	try {
		localStorage.setItem(key, JSON.stringify(value)); // Fix: Corrected `key.JSON.stringify`
	} catch (error) {
		console.error("Error writing to localStorage:", error);
	}
};

// Initial state with data fetched from localStorage
const initialState = {
	starredCaches: getLocalStorageData("starredCaches", []),
};

const starredSlice = createSlice({
	name: "starred",
	initialState,
	reducers: {
		toggleStarredCache: (state, action) => {
			const cacheName = action.payload;
			if (state.starredCaches.includes(cacheName)) {
				state.starredCaches = state.starredCaches.filter((name) => name !== cacheName);
			} else {
				state.starredCaches.push(cacheName);
			}
			// Store the updated starredCaches array in localStorage
			setLocalStorageData("starredCaches", state.starredCaches);
		},
	},
});

export const { toggleStarredCache } = starredSlice.actions;
export default starredSlice.reducer;
