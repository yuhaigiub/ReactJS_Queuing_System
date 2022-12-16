import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

import devicesReducer from "../features/devicesSlice";
import servicesReducer from "../features/servicesSlice";
import numbersReducer from "../features/numbersSlice";
import rolesReducer from "../features/rolesSlice";
import accountsReducer from "../features/accountsSlice";

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["devices", "services", "numbers", "roles", "accounts"],
	version: 1,
};

const devicesConfig = {
	key: "devices",
	storage,
	blacklist: ["loaded"],
};

const servicesConfig = {
	key: "services",
	storage,
	blacklist: ["loaded"],
};

const numbersConfig = {
	key: "numbers",
	storage,
	blacklist: ["loaded"],
};

const rolesConfig = {
	key: "roles",
	storage,
	blacklist: ["loaded"],
};

const accountsConfig = {
	key: "accounts",
	storage,
	blacklist: ["loaded"],
};

const reducer = combineReducers({
	devices: persistReducer(devicesConfig, devicesReducer),
	services: persistReducer(servicesConfig, servicesReducer),
	numbers: persistReducer(numbersConfig, numbersReducer),
	roles: persistReducer(rolesConfig, rolesReducer),
	accounts: persistReducer(accountsConfig, accountsReducer),
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// custom hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
