import React from "react";

import { Form, Input, Select } from "antd";
import MButton from "../../../common/MButton";

// type
import type { Account } from "../../../../features/interfaces";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../app/store";
import { getAllRolesSelector } from "../../../../features/rolesSlice";
import { useFetchServices } from "../../../../app/dataFetchingHooks";

const AccountStandardForm: React.FC<Props> = ({ type, onSubmit, data }) => {
	const [form] = Form.useForm();
	const navigate = useNavigate();

	useFetchServices();
	const availableRoles = useAppSelector(getAllRolesSelector);
	const rolesOptions = availableRoles.map((role) => {
		return { label: role.roleName, value: role.key };
	});

	return (
		<div style={{ padding: "2em", height: "100%", width: "100%" }}>
			<Form
				form={form}
				initialValues={{ ...data, retypePassword: data?.password }}
				layout="vertical"
				onFinish={(values: any) => {
					const { retypePassword, ...data } = values;
					onSubmit(data);

					navigate("/main/settings/accounts");
				}}>
				<div
					style={{
						background: "white",
						padding: "1em 4em",
						display: "flex",
						flexDirection: "column",
						rowGap: "1em",
						boxShadow: "2px 2px 8px rgba(70, 64, 67, 0.1)",
						borderRadius: "9px",
					}}>
					<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: 700 }}>
						Thông tin tài khoản
					</div>
					<div
						style={{
							width: "100%",
							height: "100%",
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							columnGap: "2em",
						}}>
						<div>
							<Form.Item name="fullName" label="Họ tên">
								<Input />
							</Form.Item>
							<Form.Item name="tel" label="Số điện thoại">
								<Input />
							</Form.Item>
							<Form.Item name="email" label="Email">
								<Input />
							</Form.Item>
							<div>
								<label style={{ display: "block" }}>Vai trò</label>
								<Form.Item name="role" noStyle>
									<Select style={{ width: "100%" }} options={rolesOptions} />
								</Form.Item>
							</div>
						</div>
						<div>
							<Form.Item name="username" label="Tên đăng nhập">
								<Input />
							</Form.Item>
							<Form.Item name="password" label="Mật khẩu">
								<Input.Password />
							</Form.Item>
							<Form.Item name="retypePassword" label="Nhập lại mật khẩu">
								<Input.Password />
							</Form.Item>
							<div>
								<label style={{ display: "block" }}>Tình trạng</label>
								<Form.Item name="actionStatus" noStyle>
									<Select style={{ width: "100%" }} options={actionStatusOptions} />
								</Form.Item>
							</div>
						</div>
					</div>
					<p style={{ marginTop: "2em" }}>
						<span style={{ color: "red" }}>*</span> là trường thông tin bắt buộc
					</p>
				</div>
				<div style={{ display: "flex", justifyContent: "center", columnGap: "2em", margin: "2em" }}>
					<MButton
						content="Hủy bỏ"
						onClickFn={() => {
							navigate("/main/settings/accounts");
						}}
					/>
					<MButton
						content={type === "add" ? "Thêm tài khoản" : "Cập nhật"}
						htmlType="submit"
						type="primary"
					/>
				</div>
			</Form>
		</div>
	);
};

export default AccountStandardForm;

interface Props {
	type: "update" | "add";
	onSubmit: (values: any) => void;
	data?: Account;
}

const actionStatusOptions = [
	{ value: "Hoạt động", label: "Hoạt động" },
	{ value: "Ngừng hoạt động", label: "Ngừng hoạt động" },
];
