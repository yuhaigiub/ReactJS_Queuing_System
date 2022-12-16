import React from "react";

import GeneralLayout from "../../common/GeneralLayout";
import MBreadcrumb from "../../common/MBreadcrumb";
import ViewDevice from "./ViewDevice";

const ViewDeviceMain = () => {
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
					<MBreadcrumb
						items={[
							{ label: "Thiết bị", link: "/main/devices" },
							{ label: "Danh sách thiết bị", link: "/main/devices" },
							{ label: "Chi tiết", link: "" },
						]}
					/>
				</div>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>
					Danh sách thiết bị
				</div>
			</div>
			<div style={{ width: "100%", height: "100%", position: "relative", paddingRight: "8%" }}>
				<ViewDevice />
			</div>
		</GeneralLayout>
	);
};

export default ViewDeviceMain;
