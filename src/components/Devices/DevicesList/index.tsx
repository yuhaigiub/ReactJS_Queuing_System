import React from "react";
import { useFetchDevices } from "../../../app/dataFetchingHooks";

import { useAppSelector } from "../../../app/store";
import { getAllDevicesSelector } from "../../../features/devicesSlice";

import GeneralLayout from "../../common/GeneralLayout";
import MBreadcrumb from "../../common/MBreadcrumb";
import DevicesList from "./DevicesList";

const DevicesListMain = () => {
	useFetchDevices();
	const data = useAppSelector(getAllDevicesSelector);

	return (
		<>
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
						<MBreadcrumb
							items={[
								{ label: "Thiết bị", link: "/main/devices" },
								{ label: "Danh sách thiết bị", link: "" },
							]}
						/>
					</div>
					<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>
						Danh sách thiết bị
					</div>
				</div>
				<div style={{ width: "100%", height: "100%", position: "relative" }}>
					<DevicesList serverData={data} />
				</div>
			</GeneralLayout>
		</>
	);
};

export default DevicesListMain;
