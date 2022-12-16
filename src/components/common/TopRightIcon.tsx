import type { MenuProps } from "antd";
import React from "react";

import { SmileOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
	{
		key: "1",
		label: (
			<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
				1st menu item
			</a>
		),
	},
	{
		key: "2",
		label: (
			<a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
				2nd menu item (disabled)
			</a>
		),
		icon: <SmileOutlined />,
		disabled: true,
	},
	{
		key: "3",
		label: (
			<a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
				3rd menu item (disabled)
			</a>
		),
		disabled: true,
	},
	{
		key: "4",
		danger: true,
		label: "a danger item",
	},
];

const TopRightIcon: React.FC<Props> = ({ fullName }) => {
	const navigate = useNavigate();

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				columnGap: "1em",
			}}>
			<Dropdown menu={{ items }}>
				<Avatar size="small" />
			</Dropdown>
			<div
				onClick={() => {
					navigate(`/main/profile/1`);
				}}
				style={{
					display: "flex",
					columnGap: "0.5em",
					justifyContent: "center",
					alignItems: "center",
					cursor: "pointer",
				}}>
				<Avatar size={36} />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
					}}>
					<div
						style={{
							lineHeight: "1em",
							fontSize: "1em",
							fontWeight: 400,
							color: "#7E7D88",
						}}>
						Xin chào
					</div>
					<div
						style={{ color: "#535261", fontWeight: 700, fontSize: "1.1em", lineHeight: "1.1em" }}>
						{fullName}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopRightIcon;

interface Props {
	fullName: string;
}
