import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { parse, format } from "date-fns";

import { Select, DatePicker } from "antd";
import TableLayout from "../../common/TableLayout";
import MTable from "../../common/MTable";
import { useAppSelector } from "../../../app/store";
import { getAllServicesSelector } from "../../../features/servicesSlice";

// type
import type { ColumnsType } from "antd/es/table";
import type { Number_, UseStatusType, UseStatusOptions } from "../../../features/interfaces";
import { useFetchServices } from "../../../app/dataFetchingHooks";
import { AddIcon } from "../../common/Icons/icons";
import MFloatButton from "../../common/MFloatButton";

const NumbersList: React.FC<Props> = ({ serverData }) => {
	const navigate = useNavigate();

	const [data, setData] = useState<Number_[]>([]);
	const [useStatus, setUseStatus] = useState<UseStatusOptions>("Tất cả");
	const [service, setService] = useState<string>("Tất cả");
	const [source, setSource] = useState<string>("Tất cả");
	const [keyword, setKeyword] = useState<string>("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	useFetchServices();
	const availableServices = useAppSelector(getAllServicesSelector);
	const serviceNameOptions = [
		{ value: "Tất cả", label: "Tất cả" },
		...availableServices.map((service) => {
			return { value: service.serviceName, label: service.serviceName };
		}),
	];

	const columns: ColumnsType<Number_> = [
		{
			title: "STT",
			dataIndex: "number",
			key: "number",
			render: (text) => <>{text}</>,
		},
		{
			title: "Tên khách hàng",
			dataIndex: "customerName",
			key: "customerName",
			render: (text) => <>{text}</>,
		},
		{
			title: "Tên dịch vụ",
			dataIndex: "serviceId",
			key: "serviceId",
			render: (id) => (
				<>{availableServices.find((service) => service.serviceId === id)?.serviceName}</>
			),
		},
		{
			title: "Thời gian cấp",
			dataIndex: "time",
			key: "time",
			render: (text) => <>{format(new Date(text), "kk:mm - dd/LL/yyyy")}</>,
		},
		{
			title: "Hạn sử dụng",
			dataIndex: "expireDate",
			key: "expireDate",
			render: (text) => <>{format(new Date(text), "kk:mm - dd/LL/yyyy")}</>,
		},
		{
			title: "Trạng thái",
			dataIndex: "useStatus",
			key: "useStatus",
			render: (text: UseStatusType) => {
				switch (text) {
					case "Đang chờ":
						return (
							<span
								style={{
									display: "flex",
									justifyItems: "center",
									columnGap: "0.5em",
									fontWeight: 600,
								}}>
								<span style={{ color: "blue", lineHeight: "0.7em", fontSize: "1.5em" }}>•</span>
								{text}
							</span>
						);
					case "Bỏ qua":
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
					case "Đã sử dụng":
						return (
							<span
								style={{
									display: "flex",
									justifyItems: "center",
									columnGap: "0.5em",
									fontWeight: 600,
								}}>
								<span style={{ color: "gray", lineHeight: "0.7em", fontSize: "1.5em" }}>•</span>
								{text}
							</span>
						);
				}
			},
		},
		{
			title: "Nguồn cấp",
			dataIndex: "source",
			key: "source",
			render: (text) => <>{text}</>,
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
							navigate(`/main/numbers/view/${record.key}`);
						}}>
						Chi tiết
					</div>
				);
			},
		},
	];

	useEffect(() => {
		let filteredData = [...serverData];
		if (service !== "Tất cả")
			filteredData = filteredData.filter(
				(data) =>
					availableServices.find((service) => service.serviceId === data.serviceId)?.serviceName ===
					service
			);
		if (useStatus !== "Tất cả")
			filteredData = filteredData.filter((data) => data.useStatus === useStatus);
		if (source !== "Tất cả") filteredData = filteredData.filter((data) => data.source === source);
		if (keyword !== "")
			filteredData = filteredData.filter((data) => {
				for (const field in data) {
					if (
						data[field as keyof Number_]?.toString().toUpperCase().includes(keyword.toUpperCase())
					)
						return true;
				}
				return false;
			});
		if (startDate !== "") {
			const start = parse(startDate, "dd/LL/yyyy", new Date());
			filteredData = filteredData.filter(
				(data) => parse(data.time, "kk:mm - dd/LL/yyyy", new Date()) >= start
			);
		}
		if (endDate !== "") {
			const end = parse(endDate, "dd/LL/yyyy", new Date());
			filteredData = filteredData.filter(
				(data) => parse(data.time, "kk:mm - dd/LL/yyyy", new Date()) <= end
			);
		}
		setData(filteredData);
	}, [serverData, service, useStatus, source, keyword, startDate, endDate, availableServices]);

	const searches = (
		<>
			<div style={{ display: "flex", columnGap: "2em" }}>
				<div>
					<label style={{ display: "block" }}>Tên dịch vụ</label>
					<Select
						style={{ width: "10em" }}
						value={service}
						onChange={(value) => {
							setService(value);
						}}
						options={serviceNameOptions}
					/>
				</div>
				<div>
					<label style={{ display: "block" }}>Tình trạng</label>
					<Select
						style={{ width: "10em" }}
						value={useStatus}
						onChange={(value) => {
							setUseStatus(value);
						}}
						options={useStatusOptions}
					/>
				</div>
				<div>
					<label style={{ display: "block" }}>Nguồn cấp</label>
					<Select
						style={{ width: "10em" }}
						value={source}
						onChange={(value) => {
							setSource(value);
						}}
						options={sourceOptions}
					/>
				</div>
				<div>
					<label style={{ display: "block" }}>Chọn thời gian</label>
					<div>
						<span>
							<DatePicker
								format="DD/MM/YYYY"
								onChange={(date, dateString) => {
									setStartDate(dateString);
								}}
							/>
						</span>
						<span>{">"}</span>
						<span>
							<DatePicker
								format="DD/MM/YYYY"
								onChange={(date, dateString) => {
									setEndDate(dateString);
								}}
							/>
						</span>
					</div>
				</div>
			</div>
			<div>
				<label style={{ display: "block" }}>Từ khóa</label>
				<input
					className="service-input-field"
					value={keyword}
					onChange={(e) => {
						setKeyword(e.target.value);
					}}
					placeholder="Nhập từ khóa"
					style={{
						width: "12em",
						height: "30px",
						borderRadius: "5px",
						padding: "10px",
						border: "0.8px solid rgba(200, 200, 200, 0.85)",
					}}
				/>
			</div>
		</>
	);

	const table = <MTable data={data} columns={columns} />;

	return (
		<>
			<TableLayout searches={searches} table={table} />
			<MFloatButton
				text="Cấp số mới"
				link="/main/numbers/add"
				icon={<AddIcon style={{ stroke: "#FF7506", color: "#FF7506", fontSize: "2em" }} />}
			/>
		</>
	);
};

export default NumbersList;

interface Props {
	serverData: Number_[];
}

const useStatusOptions = [
	{
		value: "Tất cả",
		label: "Tất cả",
	},
	{
		value: "Đang chờ",
		label: "Đang chờ",
	},
	{
		value: "Đã sử dụng",
		label: "Đã sử dụng",
	},
	{
		value: "Bỏ qua",
		label: "Bỏ qua",
	},
];

const sourceOptions = [
	{
		value: "Tất cả",
		label: "Tất cả",
	},
	{
		value: "Kiosk",
		label: "Kiosk",
	},
	{
		value: "Hệ thống",
		label: "Hệ thống",
	},
];
