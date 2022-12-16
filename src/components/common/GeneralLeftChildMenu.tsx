import React from "react";

// firebase
import { auth } from "../../app/firebaseConfig";
import { signOut } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import MLogo from "./MLogo";
import MButton from "./MButton";
import MMenu from "./MMenu";

const GeneralLeftChildMenu: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div style={containerStyle}>
			<div style={{ width: "100%" }}>
				<div style={logoStyle}>
					<MLogo width={100} />
				</div>
				<MMenu />
			</div>
			<MButton
				content="Đăng xuất"
				extraStyle={{ width: "80%" }}
				onClickFn={() => {
					signOut(auth)
						.then(() => {
							navigate("/");
						})
						.catch((error: Error) => console.log(error.message));
				}}
			/>
		</div>
	);
};

export default GeneralLeftChildMenu;

const containerStyle: React.CSSProperties = {
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	alignItems: "center",
};

const logoStyle: React.CSSProperties = {
	display: "flex",
	justifyContent: "center",
	marginBottom: "15%",
};
