import { createSlice } from "@reduxjs/toolkit";

const getLocalStorageData = (key, defaultValue) => {
	try {
		const storedData = localStorage.getItem(key);
		return storedData ? JSON.parse(storedData) : defaultValue;
	} catch (error) {
		console.log("Error reading form localStorage:", error);
		return defaultValue;
	}
};

const setLocalStorageData = (key, value) => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.log("Error reading form localStorage:", error);
	}
};

const initialState = {
	saveItemIds: getLocalStorageData("saveItemIds", []),
};

export const saveDataSlice = createSlice({
	name: "data", // Slice name
	initialState,
	reducers: {
		saveItem: (state, { payload }) => {
			if (state.saveItemIds.includes(payload)) {
				state.saveItemIds = state.saveItemIds.filter((si) => si !== payload);
			} else {
				state.saveItemIds = [...state.saveItemIds, payload];
			}

			// Update localStorage whenever the state changes
			setLocalStorageData("saveItemIds", state.saveItemIds);
		},
	},
});

// Exporting actions
export const { saveItem } = saveDataSlice.actions;

// Exporting reducer
export default saveDataSlice.reducer;
