import React from "react";

// type
import type { Device } from "../../../features/interfaces";

import GeneralLayout from "../../common/GeneralLayout";
import MBreadcrumb from "../../common/MBreadcrumb";
import DeviceStandardForm from "./DeviceStandardForm";

const DeviceStandardFormMain: React.FC<Props> = ({ type, onSubmit, data }) => {
	const breadcrumbItems =
		type === "add"
			? [
					{ label: "Thiết bị", link: "main/devices" },
					{ label: "Danh sách thiết bị", link: "/main/devices" },
					{ label: "Thêm thiết bị", link: "" },
			  ]
			: [
					{ label: "Thiết bị", link: "main/devices" },
					{ label: "Danh sách thiết bị", link: "/main/devices" },
					{ label: "Cập nhật thiết bị", link: "" },
			  ];

	return (
		<GeneralLayout>
			<div
				style={{
					width: "100%",
					height: "100%",
					padding: "2em 2em 0 2em",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}>
				<div>
					<MBreadcrumb items={breadcrumbItems} />
				</div>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>
					Danh sách thiết bị
				</div>
			</div>
			<div
				style={{
					width: "100%",
					height: "100%",
					position: "relative",
				}}>
				{data !== undefined ? (
					<DeviceStandardForm type={type} onSubmit={onSubmit} data={data} />
				) : (
					<DeviceStandardForm type={type} onSubmit={onSubmit} />
				)}
			</div>
		</GeneralLayout>
	);
};

export default DeviceStandardFormMain;

interface Props {
	type: "add" | "update";
	onSubmit: (values: any) => void;
	data?: Device;
}
