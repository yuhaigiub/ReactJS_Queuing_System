import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import MTable from "../../../common/MTable";
import TableLayout from "../../../common/TableLayout";

// type
import type { ColumnsType } from "antd/es/table";
import type { Role } from "../../../../features/interfaces";
import MFloatButton from "../../../common/MFloatButton";
import { AddIcon } from "../../../common/Icons/icons";

const RolesList: React.FC<Props> = ({ serverData }) => {
	const navigate = useNavigate();
	const [data, setData] = useState<Role[]>([]);
	const [keyword, setKeyword] = useState<string>("");
	const columns: ColumnsType<Role> = [
		{ title: "Tên vai trò", dataIndex: "roleName", key: "roleName", render: (text) => <>{text}</> },
		{
			title: "Số người dùng",
			dataIndex: "numberOfUsers",
			key: "numberOfUsers",
			render: (text) => <>{text}</>,
		},
		{
			title: "Mô tả",
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
		{
			title: "",
			dataIndex: "update",
			key: "update",
			render: (_, record) => {
				return (
					<div
						style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
						onClick={() => {
							navigate(`/main/settings/roles/update/${record.key}`);
						}}>
						Cập nhật
					</div>
				);
			},
		},
	];

	useEffect(() => {
		let filteredData = [...serverData];
		if (keyword !== "")
			filteredData = filteredData.filter((data) => {
				for (const field in data) {
					if (data[field as keyof Role]?.toString().toUpperCase().includes(keyword.toUpperCase()))
						return true;
				}
				return false;
			});

		setData(filteredData);
	}, [serverData, keyword]);

	const searches = (
		<div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
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
		</div>
	);

	const table = <MTable data={data} columns={columns} />;

	return (
		<>
			<TableLayout searches={searches} table={table} />
			<MFloatButton
				text="Thêm vai trò"
				link="/main/settings/roles/add"
				icon={<AddIcon style={{ stroke: "#FF7506", color: "#FF7506", fontSize: "2em" }} />}
			/>
		</>
	);
};

export default RolesList;

interface Props {
	serverData: Role[];
}
