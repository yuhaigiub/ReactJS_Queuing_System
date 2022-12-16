import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../app/store";
import { getAllRolesSelector } from "../../../../features/rolesSlice";

import { Select } from "antd";
import MTable from "../../../common/MTable";
import TableLayout from "../../../common/TableLayout";
import { useFetchServices } from "../../../../app/dataFetchingHooks";

// type
import type { ColumnsType } from "antd/es/table";
import type {
	Account,
	ActionStatusOptions,
	ActionStatusType,
} from "../../../../features/interfaces";
import MFloatButton from "../../../common/MFloatButton";
import { AddIcon } from "../../../common/Icons/icons";

const AccountsList: React.FC<Props> = ({ serverData }) => {
	const navigate = useNavigate();
	const [status, setStatus] = useState<ActionStatusOptions>("Tất cả");
	const [keyword, setKeyword] = useState<string>("");
	const [data, setData] = useState<Account[]>([]);

	useFetchServices();
	const availableRoles = useAppSelector(getAllRolesSelector);
	const rolesOptions = [
		{ value: "Tất cả", label: "Tất cả" },
		...availableRoles.map((role) => {
			return { value: role.roleName, label: role.roleName };
		}),
	];

	const columns: ColumnsType<Account> = [
		{
			title: "Tên đăng nhập",
			dataIndex: "username",
			key: "username",
			render: (text) => <>{text}</>,
		},
		{ title: "Họ tên", dataIndex: "fullName", key: "fullName", render: (text) => <>{text}</> },
		{ title: "Số điện thoại", dataIndex: "tel", key: "tel", render: (text) => <>{text}</> },
		{ title: "Email", dataIndex: "email", key: "email", render: (text) => <>{text}</> },
		{
			title: "Vai trò",
			dataIndex: "role",
			key: "role",
			render: (text) => <>{availableRoles.find((role) => role.key === text)?.roleName}</>,
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
									fontWeight: 500,
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
									fontWeight: 500,
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
									fontWeight: 500,
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
			dataIndex: "update",
			key: "update",
			render: (_, record) => {
				return (
					<div
						style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
						onClick={() => {
							navigate(`/main/settings/accounts/update/${record.key}`);
						}}>
						Cập nhật
					</div>
				);
			},
		},
	];

	useEffect(() => {
		setData(serverData);
	}, [serverData]);

	const searches = (
		<>
			<div style={{ display: "flex", columnGap: "2em" }}>
				<div>
					<label style={{ display: "block" }}>Tên vai trò</label>
					<Select
						style={{ width: "10em" }}
						value={status}
						onChange={(value) => {
							setStatus(value);
						}}
						options={rolesOptions}
					/>
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
				text="Thêm tài khoản"
				link="/main/settings/accounts/add"
				textSize="0.86em"
				icon={<AddIcon style={{ stroke: "#FF7506", color: "#FF7506", fontSize: "2em" }} />}
			/>
		</>
	);
};

export default AccountsList;

interface Props {
	serverData: Account[];
}
