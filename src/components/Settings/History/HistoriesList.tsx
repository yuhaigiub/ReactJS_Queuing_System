import React, { useState, useEffect } from "react";

import { DatePicker } from "antd";
import MTable from "../../common/MTable";
import TableLayout from "../../common/TableLayout";

// type
import type { ColumnsType } from "antd/es/table";
import { format } from "date-fns";

const HistoriesList = () => {
	const [keyword, setKeyword] = useState<string>("");
	const [data, setData] = useState<DataType[]>([]);

	const columns: ColumnsType<DataType> = [
		{
			title: "Tên đăng nhập",
			dataIndex: "username",
			key: "username",
			render: (text) => <>{text}</>,
		},
		{
			title: "Thời gian tác động",
			dataIndex: "time",
			key: "time",
			render: (text) => <>{format(new Date(text), "kk:mm - dd/LL/yyyy")}</>,
		},
		{
			title: "IP thực hiện",
			dataIndex: "ip",
			key: "ip",
			render: (text) => <>{text}</>,
		},
		{
			title: "Thao tác thực hiện",
			dataIndex: "description",
			key: "description",
			render: (text) => {
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
	];

	useEffect(() => {
		setData(serverData);
	}, []);

	const searches = (
		<>
			<div style={{ display: "flex", columnGap: "2em" }}>
				<div>
					<label style={{ display: "block" }}>Chọn thời gian</label>
					<div>
						<span>
							<DatePicker />
						</span>
						<span>{">"}</span>
						<span>
							<DatePicker />
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
					style={{ height: "32px" }}
				/>
			</div>
		</>
	);

	const table = <MTable data={data} columns={columns} />;

	return (
		<>
			<TableLayout searches={searches} table={table} />
		</>
	);
};

export default HistoriesList;

interface DataType {
	key: React.Key;
	username: string;
	time: string;
	ip: string;
	description: string;
}

const serverData: DataType[] = [
	{
		key: "1",
		username: "buigiahuynt@gmail.com",
		time: "01/12/2021 15:12:17",
		ip: "192.168.3.1",
		description: "Cập nhật thông tin dịch vụ DV_01",
	},
];
