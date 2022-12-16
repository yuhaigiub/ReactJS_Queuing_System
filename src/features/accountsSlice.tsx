import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// firebase
import { secondaryAuth, db } from "../app/firebaseConfig";
import { collection, getDocs, addDoc, doc, updateDoc, increment } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

// type
import type { RootState } from "../app/store";
import type { Account } from "./interfaces";

const accountsRef = collection(db, "accounts");

// async thunks
export const fetchAccounts = createAsyncThunk("accounts/fetchAccounts", async () => {
	const data = await getDocs(accountsRef);

	const serverData = data.docs.map((doc) => {
		return { ...doc.data(), key: doc.id };
	});

	return serverData as Account[];
});

export const addAccount = createAsyncThunk("accounts/addAccount", async (newData: Account) => {
	const data: Account = {
		...newData,
		actionStatus: "Hoạt động",
		timeCreated: new Date().toString(),
	};

	// increase number of users in role
	const roleDoc = doc(db, "roles", newData.role);
	await updateDoc(roleDoc, {
		numberOfUsers: increment(1),
	});

	// create new account
	let newUserUID = "";
	createUserWithEmailAndPassword(secondaryAuth, newData.email, newData.password)
		.then((userCredential) => {
			newUserUID = userCredential.user.uid;
		})
		.catch((error: Error) => console.log(error.message));

	const newAccount = await addDoc(accountsRef, { ...data, uid: newUserUID });
	return { ...data, key: newAccount.id, uid: newUserUID };
});

export const updateAccount = createAsyncThunk(
	"accounts/updateAccount",

	async ({ newData, oldRole }: any) => {
		if (newData.role !== oldRole) {
			const oldRoleRef = doc(db, "roles", oldRole);
			const newRoleRef = doc(db, "roles", newData.role);
			await updateDoc(oldRoleRef, {
				numberOfUsers: increment(-1),
			});
			await updateDoc(newRoleRef, {
				numberOfUsers: increment(1),
			});
		}

		const accountRef = doc(db, "accounts", newData.key);
		const data = { ...newData, timeCreated: new Date().toString() };
		await updateDoc(accountRef, data);
		return newData;
	}
);

// create slice
const initialState = {
	data: [],
	loaded: false,
} as {
	data: Account[];
	loaded: boolean;
};

export const accountsSlice = createSlice({
	name: "accounts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAccounts.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loaded = true;
			})
			.addCase(addAccount.fulfilled, (state, action) => {
				state.data = [...state.data, action.payload];
			})
			.addCase(updateAccount.fulfilled, (state, action) => {
				const index = state.data.findIndex((account) => account.key === action.payload.key);
				state.data[index] = action.payload;
			});
	},
});

// selector
export const getAccountsLoadedSelector = (state: RootState) => state.accounts.loaded;
export const getAllAccountsSelector = (state: RootState) => state.accounts.data;
export const getAccountByKeySelector = (state: RootState, key: string) =>
	state.accounts.data.find((account) => account.key === key);
export const getAccountByUIDSelector = (state: RootState, uid: string) =>
	state.accounts.data.find((account) => account.uid === uid);

export default accountsSlice.reducer;
