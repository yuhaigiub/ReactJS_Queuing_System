import React from "react";
import { Form, Input, Typography } from "antd";
import "./index.css";

import MButton from "../common/MButton";

const ForgetPassword: React.FC<Props> = ({ modifyLoginState }) => {
	const [form] = Form.useForm();

	const onCancelClicked = () => {
		modifyLoginState(0);
	};

	return (
		<>
			<Form
				className="login-form"
				form={form}
				layout="vertical"
				requiredMark={false}
				onFinish={() => {
					modifyLoginState(2);
				}}>
				<Typography.Title level={3} style={{ textAlign: "center" }}>
					Đặt lại mật khẩu
				</Typography.Title>
				<Typography.Text id="email-text">
					Vui lòng nhập email để đặt lại mật khẩu của bạn*
				</Typography.Text>
				<Form.Item
					name="email"
					rules={[
						{ type: "email", message: "Vui lòng nhập e-mail hợp lệ" },
						{ required: true, message: "Vui lòng nhập e-mail" },
					]}>
					<Input className="input-box" size="large" />
				</Form.Item>
				<div className="forget-password-buttons-wrapper">
					<MButton content="Hủy" onClickFn={onCancelClicked} />
					<MButton content="Xác nhận" type="primary" htmlType="submit" />
				</div>
			</Form>
		</>
	);
};

export default ForgetPassword;

interface Props {
	modifyLoginState: (value: number) => void;
}
