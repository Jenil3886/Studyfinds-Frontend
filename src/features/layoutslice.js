import { createSlice } from "@reduxjs/toolkit";

export const viewToggleSlice = createSlice({
	name: "viewToggle", // Slice name
	initialState: "grid", // Default state is "grid"
	reducers: {
		toggleToGrid: (state) => "grid", // Action to activate grid view
		toggleToMenu: (state) => "menu", // Action to activate menu view
	},
});

// Exporting actions
export const { toggleToGrid, toggleToMenu } = viewToggleSlice.actions;

// Exporting reducer
export default viewToggleSlice.reducer;
