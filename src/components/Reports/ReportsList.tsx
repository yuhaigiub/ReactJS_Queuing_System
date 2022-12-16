import React, { useState, useEffect } from "react";

import { format, parse } from "date-fns";

import { DatePicker } from "antd";
import MTable from "../common/MTable";
import TableLayout from "../common/TableLayout";

// type
import type { ColumnsType } from "antd/es/table";
import type { Report, UseStatusType } from "../../features/interfaces";
import { useAppSelector } from "../../app/store";
import { getAllServicesSelector } from "../../features/servicesSlice";
import { useFetchServices } from "../../app/dataFetchingHooks";
import MFloatButton from "../common/MFloatButton";
import { DownloadIcon } from "../common/Icons/icons";

const ReportsList: React.FC<Props> = ({ serverData }) => {
	const [data, setData] = useState<Report[]>([]);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	useFetchServices();
	const availableServices = useAppSelector(getAllServicesSelector);

	const columns: ColumnsType<Report> = [
		{ title: "Số thứ tự", dataIndex: "number", key: "number", render: (text) => <>{text}</> },
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
			title: "Tình trạng",
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
									fontWeight: 500,
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
									fontWeight: 500,
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
									fontWeight: 500,
								}}>
								<span style={{ color: "gray", lineHeight: "0.7em", fontSize: "1.5em" }}>•</span>
								{text}
							</span>
						);
				}
			},
		},
		{ title: "Nguồn cấp", dataIndex: "source", key: "source", render: (text) => <>{text}</> },
	];

	useEffect(() => {
		let filteredData = [...serverData];
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
	}, [serverData, startDate, endDate]);

	const searches = (
		<>
			<div style={{ display: "flex", columnGap: "2em" }}>
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
		</>
	);

	const table = <MTable data={data} columns={columns} />;

	return (
		<>
			<TableLayout searches={searches} table={table} />
			<MFloatButton
				text="Tải về"
				link="/"
				textSize="1em"
				icon={<DownloadIcon style={{ stroke: "#FF7506", color: "#FF7506", fontSize: "2em" }} />}
			/>
		</>
	);
};

export default ReportsList;

interface Props {
	serverData: Report[];
}
