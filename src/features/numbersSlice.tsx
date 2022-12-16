import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//type
import type { Number_ } from "./interfaces";
import type { RootState } from "../app/store";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../app/firebaseConfig";

const numbersRef = collection(db, "numbers");

// async thunks
export const fetchNumbers = createAsyncThunk("numbers/fetchNumbers", async () => {
	const data = await getDocs(numbersRef);
	const serverData = data.docs.map((doc) => {
		return { ...doc.data(), key: doc.id };
	});
	return serverData as Number_[];
});

export const addNumber = createAsyncThunk("numbers/addNumber", async (newData: any) => {
	const index = Math.floor(Math.random() * (2 - 0 + 1) - 0);
	const useStatusRandom = ["Đã sử dụng", "Đang chờ", "Bỏ qua"][index];
	const data = {
		...newData,
		useStatus: useStatusRandom,
	};

	const newNumber = await addDoc(numbersRef, data);
	return { ...data, key: newNumber.id };
});

// create slice
const initialState = {
	data: [],
	loaded: false,
} as {
	data: Number_[];
	loaded: boolean;
};

export const numbersSlice = createSlice({
	name: "numbers",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNumbers.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loaded = true;
			})
			.addCase(addNumber.fulfilled, (state, action) => {
				state.data = [...state.data, action.payload];
			});
	},
});

// selector
export const getNumbersLoadedSelector = (state: RootState) => state.numbers.loaded;
export const getAllNumbersSelector = (state: RootState) => state.numbers.data;
export const getNumberByKeySelector = (state: RootState, key: string) =>
	state.numbers.data.find((number) => number.key === key);
export const getNumberByServiceIdSelector = (state: RootState, id: string) => {
	return state.numbers.data.filter((number) => number.serviceId === id);
};

export default numbersSlice.reducer;
