import React from "react";

import { Form, Typography, Input } from "antd";
import "./index.css";

import MButton from "../common/MButton";
import { openNotification } from "../common/utils";

const SetNewPassword: React.FC<Props> = ({ modifyLoginState }) => {
	const [form] = Form.useForm();

	const onSubmit = (value: any) => {
		modifyLoginState(0);
		openNotification({
			key: "changePasswordNotification",
			message: "Mật khẩu của bạn đã được cập nhật",
		});
	};

	return (
		<>
			<Form
				className="login-form"
				form={form}
				layout="vertical"
				requiredMark={false}
				onFinish={onSubmit}
				onFinishFailed={() => {}}>
				<Typography.Title level={3} style={{ textAlign: "center" }}>
					Đặt lại mật khẩu mới
				</Typography.Title>
				<Form.Item
					label="Mật khẩu *"
					name="newPassword"
					rules={[
						{ required: true, message: "Vui lòng nhập mật khẩu" },
						{
							validator(_, value: string) {
								if (typeof value === "undefined" || value.length === 0) {
									// let required handle
									return Promise.resolve();
								}
								if (value.length < 8) {
									return Promise.reject(new Error("Mật khẩu phải chứa ít nhất 8 kí tự"));
								}
								return Promise.resolve();
							},
						},
					]}
					hasFeedback>
					<Input.Password className="input-box" size="large" />
				</Form.Item>

				<Form.Item
					label="Nhập lại mật khẩu *"
					name="newPasswordRepeat"
					dependencies={["newPassword"]}
					hasFeedback
					rules={[
						{
							required: true,
							message: "Vui lòng nhập lại mật khẩu",
						},
						{
							validator(_, value: string) {
								if (typeof value === "undefined" || value.length === 0) {
									// let required handle
									return Promise.resolve();
								}
								if (value.length < 8) {
									return Promise.reject(new Error("Mật khẩu phải chứa ít nhất 8 kí tự"));
								}
								if (!value || form.getFieldValue("newPassword") !== value) {
									return Promise.reject(new Error("Mật khẩu nhập lại không đúng"));
								}
								return Promise.resolve();
							},
						},
					]}>
					<Input.Password className="input-box" size="large" />
				</Form.Item>
				<div className="set-new-password-confirm-button-wrapper">
					<MButton content="Xác nhận" type="primary" htmlType="submit" />
				</div>
			</Form>
		</>
	);
};

export default SetNewPassword;

interface Props {
	modifyLoginState: (value: number) => void;
}
