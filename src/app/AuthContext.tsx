import React, { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

const UserUIDContext = React.createContext("");

export const useUserUID = () => {
	return useContext(UserUIDContext);
};

const Authentication: React.FC<Props> = ({ children }) => {
	const [userUID, setUserUID] = useState<string>("");

	useEffect(() => {
		const unsubscriber = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserUID(user.uid);
			}
		});

		return unsubscriber;
	}, []);

	return (
		<>
			<UserUIDContext.Provider value={userUID}>{children}</UserUIDContext.Provider>
		</>
	);
};

export default Authentication;

interface Props {
	children: React.ReactNode;
}
