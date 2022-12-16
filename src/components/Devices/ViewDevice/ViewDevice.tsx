import React from "react";

import { useParams } from "react-router-dom";
import { useFetchServices } from "../../../app/dataFetchingHooks";
import { useAppSelector } from "../../../app/store";
import { getDeviceByKeySelector } from "../../../features/devicesSlice";

import { AddIcon } from "../../common/Icons/icons";
import MFloatButton from "../../common/MFloatButton";

// type
import { Device } from "../../../features/interfaces";
import { getAllServicesSelector } from "../../../features/servicesSlice";

const ViewDevice: React.FC = () => {
	const { key } = useParams();
	const data = useAppSelector((state) => getDeviceByKeySelector(state, key as string)) as Device;

	useFetchServices();
	const availableServices = useAppSelector(getAllServicesSelector);

	return (
		<>
			<div
				className="view-card-1"
				style={{ display: "flex", flexDirection: "column", rowGap: "2em" }}>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: 700 }}>
					Thông tin thiết bị
				</div>
				<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
					<div style={{ display: "flex", flexDirection: "column", rowGap: "2em" }}>
						<div>
							<strong>Mã thiết bị:</strong> {data.deviceId}
						</div>
						<div>
							<strong>Tên thiết bị:</strong> {data.deviceName}
						</div>
						<div>
							<strong>Địa chỉ IP:</strong> {data.ip}
						</div>
					</div>
					<div style={{ display: "flex", flexDirection: "column", rowGap: "2em" }}>
						<div>
							<strong>Loại thiết bị:</strong> {data.deviceType}
						</div>
						<div>
							<strong>Tên đăng nhập:</strong> {data.username}
						</div>
						<div>
							<strong>Mật khẩu:</strong> {data.password}
						</div>
					</div>
				</div>
				<div>
					<span>
						<strong>Dịch vụ sử dụng:</strong>{" "}
					</span>
					<span>
						{data.services
							.map((id) => availableServices.find((data) => data.serviceId === id)?.serviceName)
							.toString()}
					</span>
				</div>
			</div>
			<MFloatButton
				text="Cập nhật thiết bị"
				link={`/main/devices/update/${key}`}
				icon={<AddIcon style={{ stroke: "#FF7506", color: "#FF7506", fontSize: "2em" }} />}
				textSize="0.75em"
			/>
		</>
	);
};

export default ViewDevice;
