import React from "react";

import LogInForm from "./LogInForm";
import ForgetPassword from "./ForgetPassword";
import SetNewPassword from "./SetNewPassword";

import img1 from "../../images/Login_Image_1.png";
import img2 from "../../images/Login_Image_2.png";

export const createLoginChildren = (loginState: number, modifyLoginState: any) => {
	let leftChild;
	let rightChild;
	switch (loginState) {
		case 0:
			leftChild = <LogInForm modifyLoginState={modifyLoginState} />;
			rightChild = formImageCase1;
			break;
		case 1:
			leftChild = <ForgetPassword modifyLoginState={modifyLoginState} />;
			rightChild = formImageCase2;
			break;

		case 2:
			leftChild = <SetNewPassword modifyLoginState={modifyLoginState} />;
			rightChild = formImageCase2;
			break;
		default:
			leftChild = null;
			rightChild = formImageCase1;
			break;
	}

	return [leftChild, rightChild];
};

const formImageCase1 = (
	<>
		<img src={img1} alt="cannot load" id="login-image-1" />
		<div id="login-image-1-text">
			<div>Hệ thống</div>
			<div>
				<b>QUẢN LÝ XẾP HÀNG</b>
			</div>
		</div>
	</>
);

const formImageCase2 = <img src={img2} alt="cannot load" id="login-image-2" />;
