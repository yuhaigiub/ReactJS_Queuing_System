import { useEffect } from "react";

import { fetchAccounts, getAccountsLoadedSelector } from "../features/accountsSlice";
import { fetchDevices, getDevicesLoadedSelector } from "../features/devicesSlice";
import { fetchNumbers, getNumbersLoadedSelector } from "../features/numbersSlice";
import { fetchRoles, getRolesLoadedSelector } from "../features/rolesSlice";

import { fetchServices, getServicesLoadedSelector } from "../features/servicesSlice";
import { useAppDispatch, useAppSelector } from "./store";

export const useFetchServices = async () => {
	// console.log("loading services");
	const dispatch = useAppDispatch();
	const loadedState = useAppSelector(getServicesLoadedSelector);

	useEffect(() => {
		if (loadedState === false) {
			dispatch(fetchServices())
				.unwrap()
				.catch((error: Error) => console.log("cannot load services"));
		}
	}, [loadedState, dispatch]);
};

export const useFetchDevices = async () => {
	// console.log("loading devices");
	const dispatch = useAppDispatch();
	const loadedState = useAppSelector(getDevicesLoadedSelector);

	useEffect(() => {
		if (loadedState === false) {
			dispatch(fetchDevices())
				.unwrap()
				.catch((error: Error) => console.log("cannot load devices"));
		}
	}, [loadedState, dispatch]);
};

export const useFetchNumbers = async () => {
	// console.log("loading numbers");
	const dispatch = useAppDispatch();
	const loadedState = useAppSelector(getNumbersLoadedSelector);
	useEffect(() => {
		if (loadedState === false) {
			dispatch(fetchNumbers())
				.unwrap()
				.catch((error: Error) => console.log("cannot load numbers"));
		}
	}, [loadedState, dispatch]);
};

export const useFetchRoles = async () => {
	// console.log("loading roles");
	const dispatch = useAppDispatch();
	const loadedState = useAppSelector(getRolesLoadedSelector);

	useEffect(() => {
		if (loadedState === false) {
			dispatch(fetchRoles())
				.unwrap()
				.catch((error: Error) => console.log("cannot load roles"));
		}
	}, [loadedState, dispatch]);
};

export const useFetchAccounts = async () => {
	// console.log("loading accounts");
	const dispatch = useAppDispatch();
	const loadedState = useAppSelector(getAccountsLoadedSelector);

	useEffect(() => {
		if (loadedState === false) {
			dispatch(fetchAccounts())
				.unwrap()
				.catch((error: Error) => console.log("cannot load accounts"));
		}
	}, [loadedState, dispatch]);
};
