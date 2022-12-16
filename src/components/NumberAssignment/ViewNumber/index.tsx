import React from "react";

import GeneralLayout from "../../common/GeneralLayout";
import MBreadcrumb from "../../common/MBreadcrumb";
import ViewNumber from "./ViewNumber";

const ViewNumberMain = () => {
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
							{ label: "Cấp số", link: "/main/numbers" },
							{ label: "Danh sách cấp số", link: "/main/numbers" },
							{ label: "Chi tiết", link: "" },
						]}
					/>
				</div>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>
					Danh sách thiết bị
				</div>
			</div>
			<div style={{ width: "100%", height: "100%", position: "relative" }}>
				<ViewNumber />
			</div>
		</GeneralLayout>
	);
};

export default ViewNumberMain;
