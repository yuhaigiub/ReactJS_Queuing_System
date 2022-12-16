import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// firebase
import { db } from "../app/firebaseConfig";
import { addDoc, collection, getDocs, doc, updateDoc } from "firebase/firestore";

// type
import type { RootState } from "../app/store";
import type { ActionStatusType, ConnectionStatusType, Device } from "./interfaces";

const devicesRef = collection(db, "devices");

// async thunks
export const fetchDevices = createAsyncThunk("devices/fetchDevices", async () => {
	const data = await getDocs(devicesRef);
	const serverData = data.docs.map((doc) => {
		return { ...doc.data(), key: doc.id };
	});
	return serverData as Device[];
});

export const addDevice = createAsyncThunk("devices/addDevice", async (newData: Device) => {
	const index1 = Math.floor(Math.random() * (1 - 0 + 1) + 0);
	const index2 = Math.floor(Math.random() * (1 - 0 + 1) + 0);
	const connection = ["Kết nối", "Mất kết nối"][index1] as ConnectionStatusType;
	const action = ["Hoạt động", "Ngừng hoạt động"][index2] as ActionStatusType;
	
	// add data to server
	const data: Device = {
		...newData,
		actionStatus: action,
		connectionStatus: connection,
	};

	const newDevice = await addDoc(devicesRef, data);
	return { ...data, key: newDevice.id };
});

export const updateDevice = createAsyncThunk("devices/updateDevice", async (newData: any) => {
	const index1 = Math.floor(Math.random() * (1 - 0 + 1) + 0);
	const index2 = Math.floor(Math.random() * (1 - 0 + 1) + 0);
	const connection = ["Kết nối", "Mất kết nối"][index1] as ConnectionStatusType;
	const action = ["Hoạt động", "Ngừng hoạt động"][index2] as ActionStatusType;

	const deviceDoc = doc(db, "devices", newData.key as string);
	const data = {
		...newData,
		actionStatus: action,
		connectionStatus: connection,
	};
	await updateDoc(deviceDoc, data);
	return data;
});

// create slice
const initialState = {
	data: [],
	loaded: false,
} as {
	data: Device[];
	loaded: boolean;
};

export const devicesSlice = createSlice({
	name: "devices",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDevices.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loaded = true;
			})
			.addCase(addDevice.fulfilled, (state, action) => {
				state.data = [...state.data, action.payload];
			})
			.addCase(updateDevice.fulfilled, (state, action) => {
				const index = state.data.findIndex((device) => device.key === action.payload.key);
				state.data[index] = action.payload;
			});
	},
});

// selector
export const getDevicesLoadedSelector = (state: RootState) => state.devices.loaded;
export const getAllDevicesSelector = (state: RootState) => state.devices.data;
export const getDeviceByKeySelector = (state: RootState, key: string) =>
	state.devices.data.find((device) => device.key === key);

export default devicesSlice.reducer;
