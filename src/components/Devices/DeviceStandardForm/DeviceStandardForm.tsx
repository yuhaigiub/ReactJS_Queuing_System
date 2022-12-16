import React from "react";

import "./index.css";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/store";
import { getAllServicesSelector } from "../../../features/servicesSlice";
import { Form, Select, Input } from "antd";
import MButton from "../../common/MButton";

// type
import type { Device } from "../../../features/interfaces";
import { useFetchAccounts, useFetchServices } from "../../../app/dataFetchingHooks";
import { getAllAccountsSelector } from "../../../features/accountsSlice";

const { Option } = Select;

const DeviceStandardForm: React.FC<Props> = ({ type, onSubmit, data }) => {
	const navigate = useNavigate();
	const [form] = Form.useForm();

	useFetchServices();
	const availableServices = useAppSelector(getAllServicesSelector);

	useFetchAccounts();
	const availableAccounts = useAppSelector(getAllAccountsSelector);

	const onCancel = () => {
		navigate("/main/devices");
	};

	return (
		<Form
			id="device-standard-form"
			form={form}
			layout="vertical"
			initialValues={data}
			onFinish={(values: any) => {
				onSubmit(values);
				navigate("/main/devices");
			}}
			style={{ width: "100%", height: "100%", padding: "2em" }}>
			<div
				style={{
					width: "100%",
					height: "80%",
					background: "white",
					padding: "2em",
					borderRadius: "9px",
					boxShadow: "2px 2px 8px rgba(70, 64, 67, 0.1)",
				}}>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: 700 }}>
					Thông tin dịch vụ
				</div>
				<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "2em" }}>
					<Form.Item
						name="deviceId"
						label="Mã thiết bị"
						rules={[{ required: true, message: "Vui lòng nhập mã thiết bị" }]}>
						<Input className="form-input" placeholder="Nhập mã thiết bị" />
					</Form.Item>
					<Form.Item
						name="deviceType"
						label="Loại thiết bị"
						rules={[{ required: true, message: "Vui lòng nhập loại thiết bị" }]}>
						<Select className="form-input" options={typeOptions} placeholder="Chọn loại thiết bị" />
					</Form.Item>
					<Form.Item
						name="deviceName"
						label="Tên thiết bị"
						rules={[{ required: true, message: "Vui lòng nhập tên thiết bị" }]}>
						<Input className="form-input" placeholder="Nhập tên thiết bị" />
					</Form.Item>
					<Form.Item
						name="username"
						label="Tên đăng nhập"
						rules={[
							{ required: true, message: "Vui lòng nhập tên đăng nhập" },
							{
								validator(_, value: string) {
									const account = availableAccounts.find((account) => account.username === value);
									if (typeof value === "undefined" || value.length === 0) {
										// let required handle
										return Promise.resolve();
									}
									if (account === undefined) {
										return Promise.reject(new Error("Tên đăng nhập không tồn tại"));
									}
									return Promise.resolve();
								},
							},
						]}>
						<Input className="form-input" placeholder="Nhập tên đăng nhập" />
					</Form.Item>
					<Form.Item
						name="ip"
						label="Địa chỉ IP"
						rules={[{ required: true, message: "Vui lòng nhập địa chỉ Ip" }]}>
						<Input className="form-input" placeholder="Nhập địa chỉ Ip" />
					</Form.Item>
					<Form.Item
						name="password"
						label="Mật khẩu"
						dependencies={["username"]}
						rules={[
							{ required: true, message: "Vui lòng nhập mật khẩu" },
							{
								validator(_, value: string) {
									const account = availableAccounts.find(
										(account) => account.username === form.getFieldValue("username")
									);
									if (typeof value === "undefined" || value.length === 0) {
										// let required handle
										return Promise.resolve();
									}
									if (value.length < 8) {
										return Promise.reject(new Error("Mật khẩu phải chứa ít nhất 8 kí tự"));
									}
									if (value !== account?.password) {
										console.log(value + " " + account?.password);
										return Promise.reject(new Error("Mật khẩu không đúng"));
									}
									return Promise.resolve();
								},
							},
						]}>
						<Input.Password className="form-input" placeholder="Nhập mật khẩu" />
					</Form.Item>
				</div>

				<Form.Item
					name="services"
					label="Dịch vụ sử dụng"
					rules={[{ required: true, message: "Vui lòng chọn ít nhất 1 dịch vụ" }]}>
					<Select
						mode="multiple"
						style={{ width: "100%" }}
						placeholder="Nhập dịch vụ sử dụng"
						onChange={() => {}}
						optionLabelProp="label">
						{availableServices.map((service) => {
							return (
								<Option key={service.key} value={service.serviceId} label={service.serviceName}>
									{service.serviceName}
								</Option>
							);
						})}
					</Select>
				</Form.Item>
				<p>
					<span style={{ color: "red" }}>*</span> Là trường thông tin bắt buộc
				</p>
			</div>
			<div style={{ display: "flex", justifyContent: "center", columnGap: "2em", margin: "2em" }}>
				<MButton content="Hủy bỏ" onClickFn={onCancel} />
				<MButton
					content={type === "add" ? "Thêm thiết bị" : "Cập nhật"}
					htmlType="submit"
					type="primary"
				/>
			</div>
		</Form>
	);
};

export default DeviceStandardForm;

interface Props {
	type: "add" | "update";
	onSubmit: (values: any) => void;
	data?: Device;
}

const typeOptions = [
	{ value: "Kiosk", label: "Kiosk" },
	{ value: "Display Counter", label: "Display Counter" },
];
