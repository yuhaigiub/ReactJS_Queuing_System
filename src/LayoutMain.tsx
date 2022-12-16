import React, { useState, useEffect } from "react";

import GeneralLeftChildMenu from "./components/common/GeneralLeftChildMenu";
import { Outlet, useNavigate } from "react-router-dom";
import TopRightIcon from "./components/common/TopRightIcon";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./app/firebaseConfig";

const LayoutMain: React.FC = () => {
	const navigate = useNavigate();
	const [allowRender, setAllowRender] = useState<Boolean>(false);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log("user: " + user.email);
				setAllowRender(true);
			} else {
				navigate("/");
			}
		});
	}, [navigate]);

	return (
		allowRender && (
			<div
				style={{
					width: "100vw",
					height: "100vh",
					display: "grid",
					gridTemplateColumns: "15% 85%",
					position: "relative",
				}}>
				<div style={{ width: "100%", height: "100%", padding: "2em 0" }}>
					<GeneralLeftChildMenu />
				</div>
				<div style={{ width: "100%", height: "100%", backgroundColor: "#F6F6F6" }}>
					<Outlet />
				</div>
				<div style={{ position: "absolute", top: "2em", right: "2em" }}>
					<TopRightIcon fullName="Bùi Gia Huy" />
				</div>
			</div>
		)
	);
};

export default LayoutMain;
