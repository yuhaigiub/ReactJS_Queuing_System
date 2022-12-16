import React, { useState } from "react";

// firebase
import { auth } from "../../app/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import "./index.css";

import { Form, Input, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import MButton from "../common/MButton";
import { openNotification } from "../common/utils";

const { Text } = Typography;

const LogInForm: React.FC<Props> = ({ modifyLoginState }) => {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [popAlertText, setPopAlertText] = useState(false);

	const onSubmit = (value: any) => {
		signInWithEmailAndPassword(auth, value.username, value.password)
			.then((userCredential) => {
				openNotification({
					key: "loginSuccessNotification",
					message: "Đăng nhập thành công",
					description: "Nhấn để tiếp tục",
				});
				navigate("/main/dashboard");
			})
			.catch((error: Error) => {
				console.log(error);
				setPopAlertText(true);
			});
	};

	return (
		<>
			<Form
				className="login-form"
				form={form}
				initialValues={{ username: "admin@gmail.com", password: "admin123" }}
				onFinish={onSubmit}
				onFinishFailed={() => {
					setPopAlertText(true);
				}}
				requiredMark={false}
				layout="vertical">
				<Form.Item
					label="Tên đăng nhập *"
					name="username"
					rules={[
						{ type: "email", message: "" },
						{ required: true, message: "" },
					]}>
					<Input className="input-box" size="large" />
				</Form.Item>

				<Form.Item label="Mật khẩu *" name="password" rules={[{ required: true, message: "" }]}>
					<Input.Password className="input-box" size="large" />
				</Form.Item>
				{popAlertText ? (
					<Text type="danger" style={{ display: "block" }}>
						<ExclamationCircleOutlined /> Sai tên đăng nhập hoặc mật khẩu
					</Text>
				) : null}
				<div className="login-button-wrapper">
					<MButton content="Đăng nhập" type="primary" htmlType="submit" />
				</div>
				<div className="forget-password-wrapper">
					<Text
						type="danger"
						onClick={() => {
							modifyLoginState(1);
						}}>
						Quên mật khẩu?
					</Text>
				</div>
			</Form>
		</>
	);
};

export default LogInForm;

interface Props {
	modifyLoginState: (value: number) => void;
}
