import React, { useState } from "react";
import "./index.css";

import { Form, Checkbox, Input } from "antd";
import MButton from "../../common/MButton";
import { useNavigate } from "react-router-dom";

// type
import type { Service } from "../../../features/interfaces";

const ServiceStandardForm: React.FC<Props> = ({ type, onSubmit, data }) => {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [autoIncreaseWarning, setAutoIncreaseWarning] = useState<Boolean>(false);
	const [prefixWarning, setPrefixWarning] = useState<Boolean>(false);
	const [suffixWarning, setSuffixWarning] = useState<Boolean>(false);

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={
				data !== undefined
					? data
					: {
							...{
								autoIncrease: true,
								autoIncreaseFrom: "0001",
								autoIncreaseTo: "9999",
								prefix: false,
								prefixValue: "",
								suffix: false,
								suffixValue: "",
								resetEveryday: false,
							},
					  }
			}
			onFinish={(values) => {
				onSubmit(values);
				navigate("/main/services");
			}}
			style={{
				height: "80%",
				background: "white",
				padding: "2em",
				margin: "2em",
				display: "flex",
				flexDirection: "column",
				columnGap: "2em",
				borderRadius: "9px",
				boxShadow: "2px 2px 8px rgba(70, 64, 67, 0.1)",
			}}>
			<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: 700 }}>Thông tin dịch vụ</div>
			<div id="service-text-fields-wrapper" style={{ marginBottom: "1em" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						rowGap: "1em",
						justifyContent: "space-between",
					}}>
					<Form.Item
						name="serviceId"
						label="Mã dịch vụ"
						rules={[{ required: true, message: "Vui lòng nhập mã dịch vụ" }]}
						className="no-margin">
						<Input placeholder="Nhập mã dịch vụ" />
					</Form.Item>
					<Form.Item
						name="serviceName"
						label="Tên dịch vụ"
						rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ" }]}
						className="no-margin">
						<Input placeholder="Nhập tên dịch vụ" />
					</Form.Item>
				</div>
				<div>
					<label htmlFor="description" style={{ paddingBottom: "8px" }}>
						<span style={{ color: "red" }}>*</span> Mô tả
					</label>
					<Form.Item
						className="service-description-box"
						name="description"
						style={{ height: "100%", margin: 0 }}
						rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}>
						<Input.TextArea placeholder="Nhập mô tả" />
					</Form.Item>
				</div>
			</div>

			<div style={{ fontSize: "1.2em", color: "#FF7506", fontWeight: "700" }}>Quy tắc cấp số</div>
			<div id="service-checkbox-wrapper">
				<div className="flex-item-center flex-col-gap">
					<Form.Item name="autoIncrease" valuePropName="checked" noStyle>
						<Checkbox
							indeterminate={true}
							className="service-checkbox-width"
							style={{
								color: autoIncreaseWarning ? "red" : "black",
							}}>
							Tăng tự động từ:
						</Checkbox>
					</Form.Item>
					<div className="flex-item-center">
						<Form.Item
							dependencies={["autoIncrease", "autoIncreaseTo"]}
							name="autoIncreaseFrom"
							noStyle
							className="flex-item-center"
							rules={[
								{
									validator(_, value: string) {
										if (form.getFieldValue("autoIncrease") === true) {
											if (typeof value === "undefined" || value.length === 0) {
												setAutoIncreaseWarning(true);
												return Promise.reject(new Error("Vui lòng nhập"));
											}
											if (parseInt(value) > parseInt(form.getFieldValue("autoIncreaseTo"))) {
												setAutoIncreaseWarning(true);
												return Promise.reject(new Error("Vui lòng nhập đúng thứ tự"));
											}
										}
										setAutoIncreaseWarning(false);
										return Promise.resolve();
									},
								},
							]}>
							<Input className="service-checkbox-input" />
						</Form.Item>
					</div>
					<div>đến</div>
					<div className="flex-item-center">
						<Form.Item
							dependencies={["autoIncrease", "autoIncreaseFrom"]}
							name="autoIncreaseTo"
							noStyle
							className="flex-item-center"
							rules={[
								{
									validator(_, value: string) {
										if (form.getFieldValue("autoIncrease") === true) {
											if (typeof value === "undefined" || value.length === 0) {
												setAutoIncreaseWarning(true);
												return Promise.reject(new Error("Vui lòng nhập"));
											}
											if (parseInt(value) < parseInt(form.getFieldValue("autoIncreaseFrom"))) {
												setAutoIncreaseWarning(true);
												return Promise.reject(new Error("Vui lòng nhập đúng thứ tự"));
											}
										}
										setAutoIncreaseWarning(false);
										return Promise.resolve();
									},
								},
							]}>
							<Input className="service-checkbox-input" />
						</Form.Item>
					</div>
				</div>
				<div className="flex-item-center flex-col-gap">
					<Form.Item name="prefix" valuePropName="checked" noStyle>
						<Checkbox
							className="service-checkbox-width"
							style={{ color: prefixWarning ? "red" : "black" }}>
							Prefix:
						</Checkbox>
					</Form.Item>
					<div>
						<Form.Item
							dependencies={["prefix"]}
							name="prefixValue"
							noStyle
							className="flex-item-center"
							rules={[
								{
									validator(_, value: string) {
										if (form.getFieldValue("prefix") === true) {
											if (typeof value === "undefined" || value.length === 0) {
												setPrefixWarning(true);
												return Promise.reject(new Error("Vui lòng nhập"));
											}
										}
										setPrefixWarning(false);
										return Promise.resolve();
									},
								},
							]}>
							<Input className="service-checkbox-input" />
						</Form.Item>
					</div>
				</div>
				<div className="flex-item-center flex-col-gap">
					<Form.Item name="suffix" valuePropName="checked" noStyle>
						<Checkbox
							className="service-checkbox-width"
							style={{ color: suffixWarning ? "red" : "black" }}>
							Suffix:
						</Checkbox>
					</Form.Item>
					<div>
						<Form.Item
							dependencies={["suffix"]}
							name="suffixValue"
							noStyle
							className="flex-item-center"
							rules={[
								{
									validator(_, value: string) {
										if (form.getFieldValue("suffix") === true) {
											if (typeof value === "undefined" || value.length === 0) {
												setSuffixWarning(true);
												return Promise.reject(new Error("Vui lòng nhập"));
											}
										}
										setSuffixWarning(false);
										return Promise.resolve();
									},
								},
							]}>
							<Input className="service-checkbox-input" />
						</Form.Item>
					</div>
				</div>
				<div className="flex-item-center flex-col-gap">
					<Form.Item name="resetEveryday" valuePropName="checked" noStyle>
						<Checkbox className="service-checkbox-width">Reset mỗi ngày</Checkbox>
					</Form.Item>
				</div>
				<p>
					<span style={{ color: "red" }}>*</span> là trường thông tin bắt buộc
				</p>
			</div>
			<div id="service-button-wrapper">
				<MButton
					content="Hủy bỏ"
					onClickFn={() => {
						navigate("/main/services");
					}}
				/>
				<MButton
					content={type === "add" ? "Thêm thiết bị" : "Cập nhật"}
					htmlType="submit"
					type="primary"
				/>
			</div>
		</Form>
	);
};

export default ServiceStandardForm;

interface Props {
	data?: Service;
	type: "update" | "add";
	onSubmit: (values: any) => void;
}
