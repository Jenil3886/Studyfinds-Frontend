import { configureStore } from "@reduxjs/toolkit";
import viewToggleReducer from "../features/layoutslice";
import dataReducer from "../features/dataSlice";
import saveDataReducer from "../features/dataSlice";
import notificationReducer from "../features/notificationSlice";
import starredReducer from "../features/starredSlice ";

export const store = configureStore({
	reducer: {
		viewToggle: viewToggleReducer, //add view toggal reducer
		data: dataReducer, //add data reducer
		saveData: saveDataReducer, //add saveData reducer
		notifications: notificationReducer, // add notifications reducer
		starred: starredReducer,
	},
});

export const dispatchAction = (action) => {
	store.dispatch(action);
};
