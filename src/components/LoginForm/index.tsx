import React from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createLoginChildren } from "./createChildren";

import { auth } from "../../app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import FormLayout from "./layout";

const LoginMain = () => {
	const [loginState, setLoginState] = useState(0);
	const modifyLoginState = (value: number) => {
		setLoginState(value);
	};

	const navigate = useNavigate();
	const [allowRender, setAllowRender] = useState<Boolean>(false);

	useEffect(() => {
		console.log("Checking user status");
		const unsubscriber = onAuthStateChanged(auth, (user) => {
			if (user) {
				navigate("/main/dashboard");
				console.log("current user: " + user.email);
			} else {
				setAllowRender(true);
			}
		});

		return unsubscriber;
	}, [navigate]);
	const [leftChild, rightChild] = createLoginChildren(loginState, modifyLoginState);

	return allowRender && <FormLayout leftChild={leftChild} rightChild={rightChild} />;
};

export default LoginMain;
