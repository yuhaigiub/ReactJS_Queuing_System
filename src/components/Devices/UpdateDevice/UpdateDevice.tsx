import React from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../app/store";
import { getDeviceByKeySelector, updateDevice } from "../../../features/devicesSlice";

// type
import { Device } from "../../../features/interfaces";
import DeviceStandardFormMain from "../DeviceStandardForm";

const UpdateDevice = () => {
	const { key } = useParams();
	const dispatch = useAppDispatch();

	const data = useAppSelector((state) => getDeviceByKeySelector(state, key as string)) as Device;

	// console.log(data);

	const onSubmit = (values: any) => {
		// add record to database
		dispatch(updateDevice({ ...data, ...values }))
			.unwrap()
			.catch((error: Error) => console.log(error.message));
	};

	return <DeviceStandardFormMain type="update" onSubmit={onSubmit} data={data} />;
};

export default UpdateDevice;
