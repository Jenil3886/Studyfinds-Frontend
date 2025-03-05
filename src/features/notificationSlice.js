import { createSlice } from "@reduxjs/toolkit";

const loadNotificationsFromLocalStorage = () => {
	const savedNotifications = localStorage.getItem("notifications");
	return savedNotifications ? JSON.parse(savedNotifications) : [];
};

const initialState = {
	data: loadNotificationsFromLocalStorage(), // Load from local storage
};
export const notificationSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		addNotification: (state, { payload }) => {
			// Add new notification to the list
			state.data = [payload, ...state.data];
			localStorage.setItem("notifications", JSON.stringify(state.data)); // Save to local storage
		},

		removeNotification: (state, { payload }) => {
			state.data = state.data.filter((notification) => notification.id !== payload);
			localStorage.setItem("notifications", JSON.stringify(state.data)); // Update local storage
		},

		clearNotifications: (state) => {
			// Clear all notifications
			state.data = [];
			localStorage.removeItem("notifications"); // Remove from local storage
		},
	},
});

// Exporting actions
export const { addNotification, removeNotification, clearNotifications } = notificationSlice.actions;

// Exporting reducer
export default notificationSlice.reducer;
