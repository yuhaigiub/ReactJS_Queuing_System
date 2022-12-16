import React from "react";

import { useAppDispatch } from "../../../app/store";

import { addDevice } from "../../../features/devicesSlice";
import DeviceStandardFormMain from "../DeviceStandardForm";

// type

const AddDevice = () => {
	const dispatch = useAppDispatch();

	const onSubmit = (values: any) => {
		// add record to database
		dispatch(addDevice(values))
			.unwrap()
			.catch((error: Error) => console.log(error.message));
	};

	return <DeviceStandardFormMain onSubmit={onSubmit} type="add" />;
};

export default AddDevice;
