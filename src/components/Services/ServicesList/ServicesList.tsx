import React, { useState, useEffect } from "react";

import { parse } from "date-fns";
import { useNavigate } from "react-router-dom";

import { Select, DatePicker } from "antd";
import TableLayout from "../../common/TableLayout";
import MTable from "../../common/MTable";

// type
import type { ColumnsType } from "antd/es/table";
import type { Service, ActionStatusOptions, ActionStatusType } from "../../../features/interfaces";
import MFloatButton from "../../common/MFloatButton";
import { AddIcon } from "../../common/Icons/icons";

const ServicesList: React.FC<Props> = ({ serverData }) => {
	const navigate = useNavigate();
	const [actionStatus, setActionStatus] = useState<ActionStatusOptions>("Tất cả");
	const [keyword, setKeyword] = useState<string>("");
	const [data, setData] = useState<Service[]>([]);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const columns: ColumnsType<Service> = [
		{
			title: "Mã dịch vụ",
			dataIndex: "serviceId",
			key: "serviceId",
			render: (text) => <>{text}</>,
		},
		{
			title: "Tên dịch vụ",
			dataIndex: "serviceName",
			key: "serviceName",
			render: (text) => <>{text}</>,
		},
		{
			title: "Mô tả",
			dataIndex: "description",
			key: "description",
			render: (text: string) => {
				const numberOfCharacters = 50;
				return (
					<>
						{text.length < numberOfCharacters
							? text
							: text.substring(0, numberOfCharacters) + "..."}
					</>
				);
			},
		},
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
			title: "",
			dataIndex: "view",
			key: "view",
			render: (_, record) => {
				return (
					<div
						style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
						onClick={() => {
							navigate(`/main/services/view/${record.key}`);
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
							navigate(`/main/services/update/${record.key}`);
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

		if (keyword !== "")
			filteredData = filteredData.filter((data) => {
				for (const field of ["serviceId", "serviceName", "description", "actionStatus"]) {
					if (
						data[field as keyof Service]?.toString().toUpperCase().includes(keyword.toUpperCase())
					)
						return true;
				}
				return false;
			});

		if (startDate !== "") {
			const start = parse(startDate, "dd/LL/yyyy", new Date());
			filteredData = filteredData.filter((data) => new Date(data.timeCreated) >= start);
		}
		if (endDate !== "") {
			const end = parse(endDate, "dd/LL/yyyy", new Date());
			filteredData = filteredData.filter((data) => new Date(data.timeCreated) <= end);
		}

		setData(filteredData);
	}, [serverData, actionStatus, keyword, startDate, endDate]);

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
					value={keyword}
					onChange={(e) => {
						setKeyword(e.target.value);
					}}
					placeholder="Nhập từ khóa"
					className="keyword-input-field"
				/>
			</div>
		</>
	);

	const table = <MTable data={data} columns={columns} />;

	return (
		<>
			<TableLayout searches={searches} table={table} />
			<MFloatButton
				text="Thêm dịch vụ"
				link="/main/services/add"
				icon={<AddIcon style={{ stroke: "#FF7506", color: "#FF7506", fontSize: "2em" }} />}
			/>
		</>
	);
};

export default ServicesList;

interface Props {
	serverData: Service[];
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
