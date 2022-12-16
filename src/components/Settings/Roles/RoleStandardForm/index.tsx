import React, { useMemo, useState } from "react";
import "./index.css";

import { useNavigate } from "react-router-dom";
import { Form, Input, Checkbox } from "antd";
import MButton from "../../../common/MButton";
import { FormInstance } from "antd/es/form/Form";
// import { Scrollbars } from "react-custom-scrollbars";

// type
import { Role } from "../../../../features/interfaces";

const RoleGroup: React.FC<{ name: string; roles: string[]; form: FormInstance<any> }> = ({
	name,
	roles,
	form,
}) => {
	const allValue = useMemo(() => {
		return roles.reduce((total, role) => total && form.getFieldValue(["roles", name, role]), true);
	}, [roles, form, name]);
	const [isSelectAll, setIsSelectAll] = useState<boolean>(allValue);

	return (
		<div style={{ display: "flex", flexDirection: "column", marginBottom: "1em" }}>
			<div style={{ marginBottom: "1em", fontWeight: 700, color: "#FF7506" }}>
				Nhóm chứng năng {name}
			</div>
			<div>
				<div style={{ marginBottom: "0.5em" }}>
					<Checkbox
						checked={isSelectAll}
						onChange={() => {
							roles.forEach((role) => {
								form.setFieldValue(["roles", name, role], !isSelectAll);
							});

							setIsSelectAll((value) => !value);
						}}>
						Tất cả
					</Checkbox>
				</div>
				{roles.map((role) => {
					return (
						<div key={role} style={{ marginBottom: "0.5em" }}>
							<Form.Item name={["roles", name, role]} valuePropName="checked" noStyle>
								<Checkbox style={{ margin: 0 }}>Chức năng {role}</Checkbox>
							</Form.Item>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const RoleStandardForm: React.FC<Props> = ({ type, onSubmit, data }) => {
	const navigate = useNavigate();
	const [form] = Form.useForm();

	return (
		<div id="role-form-wrapper">
			<Form
				id="role-form-wrapper-2"
				form={form}
				initialValues={
					data !== undefined
						? data
						: {
								...{
									roles: {
										A: { X: false, Y: false, Z: false },
										B: { X: false, Y: false, Z: false },
										C: { X: false, Y: false, Z: false },
									},
								},
						  }
				}
				layout="vertical"
				onFinish={(values) => {
					onSubmit(values);
					navigate("/main/settings/roles");
				}}>
				<div id="role-form-wrapper-without-button-3">
					<div id="role-left-side">
						<Form.Item
							name="roleName"
							label="Tên vai trò"
							style={{ height: "20%", margin: 0 }}
							rules={[{ required: true, message: "Vui lòng nhập tên vai trò" }]}>
							<Input style={{ borderRadius: "9px" }} placeholder="Nhập tên vai trò" />
						</Form.Item>
						<div style={{ height: "70%" }} id="role-description-wrapper">
							<Form.Item
								label="Mô tả"
								name="description"
								rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}>
								<Input.TextArea
									style={{ height: "90%", borderRadius: "9px" }}
									placeholder="Nhập mô tả"
								/>
							</Form.Item>
						</div>
						<div style={{ height: "10%" }}>
							<span style={{ color: "red" }}>*</span> là trường thông tin bắt buộc
						</div>
					</div>
					<div id="role-right-side">
						<div>
							<span style={{ color: "red" }}>*</span> Phân quyền chức năng
						</div>
						{/* <Scrollbars style={{ backgroundColor: "#fff2e7", borderRadius: "9px" }}> */}
						<div
							style={{
								backgroundColor: "#fff2e7",
								borderRadius: "9px",
								height: "350px",
								overflow: "auto",
							}}>
							<div style={{ padding: "2em" }}>
								<RoleGroup name="A" roles={["X", "Y", "Z"]} form={form} />
								<RoleGroup name="B" roles={["X", "Y", "Z"]} form={form} />
								<RoleGroup name="C" roles={["X", "Y", "Z"]} form={form} />
							</div>
						</div>
						{/* </Scrollbars> */}
					</div>
				</div>
				<div id="role-form-wrapper-with-button-3">
					<MButton
						content="Hủy bỏ"
						onClickFn={() => {
							navigate("/main/settings/roles");
						}}
					/>
					<MButton
						content={type === "add" ? "Thêm vai trò" : "Cập nhật"}
						htmlType="submit"
						type="primary"
					/>
				</div>
			</Form>
		</div>
	);
};

export default RoleStandardForm;

interface Props {
	type: "update" | "add";
	onSubmit: (values: any) => void;
	data?: Role;
}
