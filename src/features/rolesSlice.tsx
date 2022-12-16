import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// firebase
import { db } from "../app/firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";

// type
import type { RootState } from "../app/store";
import type { Role } from "./interfaces";

const rolesRef = collection(db, "roles");

// async thunks
export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
	const data = await getDocs(rolesRef);
	const serverData = data.docs.map((doc) => {
		return { ...doc.data(), key: doc.id };
	});
	return serverData as Role[];
});

export const addRole = createAsyncThunk("roles/addRole", async (newData: Role) => {
	const data: Role = {
		...newData,
		numberOfUsers: 0,
		timeCreated: new Date().toString(),
	};
	const newRole = await addDoc(rolesRef, data);

	return { ...data, key: newRole.id };
});

export const updateRole = createAsyncThunk("roles/updateRole", async (newData: any) => {
	const roleDoc = doc(db, "roles", newData.key);
	const data = { ...newData, timeCreated: new Date().toString() };
	await updateDoc(roleDoc, data);
	return data;
});

// create slice
const initialState = {
	data: [],
	loaded: false,
} as {
	data: Role[];
	loaded: boolean;
};

export const rolesSlice = createSlice({
	name: "roles",
	initialState,
	reducers: {
		incrementNumberOfUserLocal(state, action) {
			const index = state.data.findIndex((role) => role.key === action.payload);
			state.data[index].numberOfUsers += 1;
		},
		decrementNumberOfUserLocal(state, action) {
			const index = state.data.findIndex((role) => role.key === action.payload);
			state.data[index].numberOfUsers -= 1;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRoles.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loaded = true;
			})
			.addCase(addRole.fulfilled, (state, action) => {
				state.data = [...state.data, action.payload];
			})
			.addCase(updateRole.fulfilled, (state, action) => {
				const index = state.data.findIndex((role) => role.key === action.payload.key);
				state.data[index] = action.payload;
			});
	},
});

// selector
export const getRolesLoadedSelector = (state: RootState) => state.roles.loaded;
export const getAllRolesSelector = (state: RootState) => state.roles.data;
export const getRoleByKeySelector = (state: RootState, key: string) =>
	state.roles.data.find((role) => role.key === key);

export const { incrementNumberOfUserLocal, decrementNumberOfUserLocal } = rolesSlice.actions;
export default rolesSlice.reducer;
