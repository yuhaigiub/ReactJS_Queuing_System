import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// firebase
import { db } from "../app/firebaseConfig";
import { addDoc, collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";

// type
import type { ActionStatusType, Service } from "./interfaces";
import type { RootState } from "../app/store";

const servicesRef = collection(db, "services");

// async thunks
export const fetchServices = createAsyncThunk("services/fetchServices", async () => {
	const data = await getDocs(servicesRef);

	const serverData = data.docs.map((doc) => {
		return { ...doc.data(), key: doc.id };
	});

	return serverData as Service[];
});

export const addService = createAsyncThunk("services/addService", async (newData: Service) => {
	const index = Math.floor(Math.random() * (1 - 0 + 1) + 0);
	const action = ["Hoạt động", "Ngừng hoạt động"][index] as ActionStatusType;
	const data: Service = {
		...newData,
		current: 0,
		actionStatus: action,
		timeCreated: new Date().toString(),
	};
	const newService = await addDoc(servicesRef, data);
	return { ...data, key: newService.id };
});

export const incrementServiceCurrent = createAsyncThunk(
	"services/incrementServiceCurrent",
	async (key: string) => {
		const serviceDocRef = doc(db, "services", key);
		const serviceDoc = await getDoc(serviceDocRef);

		const document = { ...serviceDoc.data(), key: serviceDoc.id } as Service;

		const value =
			document["current"] < parseInt(document["autoIncreaseTo"] as string)
				? document["current"] + 1
				: 1;
		await updateDoc(serviceDocRef, {
			current: value,
		});

		return { key: document.key, current: value as number };
	}
);

export const updateService = createAsyncThunk("services/updateService", async (newData: any) => {
	const index = Math.floor(Math.random() * (1 - 0 + 1) - 0);
	const action = ["Hoạt động", "Ngừng hoạt động"][index];

	const serviceDoc = doc(db, "services", newData.key);
	const data = { ...newData, timeCreated: new Date().toString(), actionStatus: action };
	await updateDoc(serviceDoc, data);
	return data;
});

// create slice
const initialState = {
	data: [],
	loaded: false,
} as {
	data: Service[];
	loaded: boolean;
};

export const servicesStore = createSlice({
	name: "services",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchServices.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loaded = true;
			})
			.addCase(addService.fulfilled, (state, action) => {
				state.data = [...state.data, action.payload];
			})
			.addCase(updateService.fulfilled, (state, action) => {
				const index = state.data.findIndex((service) => service.key === action.payload.key);
				state.data[index] = action.payload;
			})
			.addCase(incrementServiceCurrent.fulfilled, (state, action) => {
				const index = state.data.findIndex((service) => service.key === action.payload.key);
				state.data[index].current = action.payload.current;
			});
	},
});

// selector
export const getServicesLoadedSelector = (state: RootState) => state.services.loaded;
export const getAllServicesSelector = (state: RootState) => state.services.data;
export const getServiceByKeySelector = (state: RootState, key: string) =>
	state.services.data.find((service) => service.key === key);
export const getServiceByIdSelector = (state: RootState, id: string) =>
	state.services.data.find((service) => service.serviceId === id);

export default servicesStore.reducer;
