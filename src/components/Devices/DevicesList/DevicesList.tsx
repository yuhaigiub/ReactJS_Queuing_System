import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/store";
import { getAllServicesSelector } from "../../../features/servicesSlice";
import { useFetchServices } from "../../../app/dataFetchingHooks";

import { Select } from "antd";
import TableLayout from "../../common/TableLayout";
import MTable from "../../common/MTable";

//type
import type { ColumnsType } from "antd/es/table";
import type {
	Device,
	ActionStatusType,
	ActionStatusOptions,
	ConnectionStatusType,
	ConnectionStatusOptions,
} from "../../../features/interfaces";
import { AddIcon } from "../../common/Icons/icons";
import MFloatButton from "../../common/MFloatButton";

const DevicesList: React.FC<Props> = ({ serverData }) => {
	const navigate = useNavigate();

	const [data, setData] = useState<Device[]>([]);
	const [actionStatus, setActionStatus] = useState<ActionStatusOptions>("Tất cả");
	const [connectionStatus, setConnectionStatus] = useState<ConnectionStatusOptions>("Tất cả");
	const [keyword, setKeyword] = useState<string>("");

	useFetchServices();
	const availableServices = useAppSelector(getAllServicesSelector);

	const columns: ColumnsType<Device> = [
		{ title: "Mã thiết bị", dataIndex: "deviceId", key: "deviceId", render: (text) => <>{text}</> },

		{
			title: "Tên thiết bị",
			dataIndex: "deviceName",
			key: "deviceName",
			render: (text) => <>{text}</>,
		},
		{ title: "Địa chỉ IP", dataIndex: "ip", key: "ip", render: (text) => <>{text}</> },
		{
			title: "Trạng thái hoạt động",
			dataIndex: "actionStatus",
			key: "actionStatus",
			render: (text: ActionStatusType) => {
				switch (text) {
					case "Hoạt động":
						return (
							<span
								style={{
									display: "flex",
									justifyItems: "center",
									columnGap: "0.5em",
									fontWeight: 600,
								}}>
								<span style={{ color: "green", lineHeight: "0.7em", fontSize: "1.5em" }}>•</span>
								{text}
							</span>
						);
					case "Ngừng hoạt động":
						return (
							<span
								style={{
									display: "flex",
									justifyItems: "center",
									columnGap: "0.5em",
									fontWeight: 600,
								}}>
								<span style={{ color: "red", lineHeight: "0.7em", fontSize: "1.5em" }}>•</span>
								{text}
							</span>
						);
					default:
						return (
							<span
								style={{
									display: "flex",
									justifyItems: "center",
									columnGap: "0.5em",
									fontWeight: 600,
								}}>
								<span style={{ color: "black", lineHeight: "0.7em", fontSize: "1.5em" }}>•</span>
								{text}
							</span>
						);
				}
			},
		},
		{
			title: "Trạng thái kết nối",
			dataIndex: "connectionStatus",
			key: "connectionStatus",
			render: (text: ConnectionStatusType) => {
				switch (text) {
					case "Kết nối":
						return (
							<span
								style={{
									display: "flex",
									justifyItems: "center",
									columnGap: "0.5em",
									fontWeight: 600,
								}}>
								<span style={{ color: "green", lineHeight: "0.7em", fontSize: "1.5em" }}>•</span>
								{text}
							</span>
						);
					case "Mất kết nối":
						return (
							<span
								style={{
									display: "flex",
									justifyItems: "center",
									columnGap: "0.5em",
									fontWeight: 600,
								}}>
								<span style={{ color: "red", lineHeight: "0.7em", fontSize: "1.5em" }}>•</span>
								{text}
							</span>
						);
					default:
						return (
							<span
								style={{
									display: "flex",
									justifyItems: "center",
									columnGap: "0.5em",
									fontWeight: 600,
								}}>
								<span style={{ color: "black", lineHeight: "0.7em", fontSize: "1.5em" }}>•</span>
								{text}
							</span>
						);
				}
			},
		},
		{
			title: "Dịch vụ sử dụng",
			dataIndex: "services",
			key: "services",
			render: (services: string[]) => {
				const numberOfCharacters = 50;
				const text = services
					.map((id) => availableServices.find((service) => service.serviceId === id)?.serviceName)
					.toString();
				return text.length < numberOfCharacters
					? text
					: text.substring(0, numberOfCharacters) + "...";
			},
		},
		{
			title: "",
			dataIndex: "view",
			key: "view",
			render: (_, record) => {
				return (
					<div
						style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
						onClick={() => {
							navigate(`/main/devices/view/${record.key}`);
						}}>
						Chi tiết
					</div>
				);
			},
		},
		{
			title: "",
			dataIndex: "update",
			key: "update",
			render: (_, record) => {
				return (
					<div
						style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
						onClick={() => {
							navigate(`/main/devices/update/${record.key}`);
						}}>
						Cập nhật
					</div>
				);
			},
		},
	];

	useEffect(() => {
		let filteredData = [...serverData];
		if (actionStatus !== "Tất cả")
			filteredData = filteredData.filter((data) => data.actionStatus === actionStatus);
		if (connectionStatus !== "Tất cả")
			filteredData = filteredData.filter((data) => data.connectionStatus === connectionStatus);
		if (keyword !== "") {
			filteredData = filteredData.filter((data) => {
				for (const field in data) {
					if (data[field as keyof Device].toString().toUpperCase().includes(keyword.toUpperCase()))
						return true;
				}
				return false;
			});
		}

		setData(filteredData);
	}, [serverData, actionStatus, connectionStatus, keyword, availableServices]);

	const table = <MTable data={data} columns={columns} />;

	const searches = (
		<>
			<div style={{ display: "flex", columnGap: "2em" }}>
				<div>
					<label style={{ display: "block" }}>Trạng thái hoạt động</label>
					<Select
						style={{ width: "10em" }}
						value={actionStatus}
						onChange={(value) => {
							setActionStatus(value);
						}}
						options={actionStatusOptions}
					/>
				</div>
				<div>
					<label style={{ display: "block" }}>Trạng thái kết nối</label>
					<Select
						style={{ width: "10em" }}
						value={connectionStatus}
						onChange={(value) => {
							setConnectionStatus(value);
						}}
						options={connectionStatusOptions}
					/>
				</div>
			</div>
			<div>
				<label style={{ display: "block" }}>Từ khóa</label>
				<input
					className="keyword-input-field"
					value={keyword}
					onChange={(e) => {
						setKeyword(e.target.value);
					}}
					placeholder="Nhập từ khóa"
				/>
			</div>
		</>
	);

	return (
		<>
			<TableLayout searches={searches} table={table} />
			<MFloatButton
				text="Thêm thiết bị"
				link="/main/devices/add"
				icon={<AddIcon style={{ stroke: "#FF7506", color: "#FF7506", fontSize: "2em" }} />}
			/>
		</>
	);
};

export default DevicesList;

interface Props {
	serverData: Device[];
}

const actionStatusOptions = [
	{
		value: "Tất cả",
		label: "Tất cả",
	},
	{
		value: "Hoạt động",
		label: "Hoạt động",
	},
	{
		value: "Ngừng hoạt động",
		label: "Ngừng hoạt động",
	},
];

const connectionStatusOptions = [
	{
		value: "Tất cả",
		label: "Tất cả",
	},
	{
		value: "Kết nối",
		label: "Kết nối",
	},
	{
		value: "Mất kết nối",
		label: "Mất kết nối",
	},
];
