import React from "react";

import GeneralLayout from "../../common/GeneralLayout";
import MBreadcrumb from "../../common/MBreadcrumb";
import HistoriesList from "./HistoriesList";

const HistoriesListMain = () => {
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
							{ label: "Cài đặt hệ thống", link: "/main/settings/roles" },
							{ label: "Nhật ký hoạt động", link: "" },
						]}
					/>
				</div>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}></div>
			</div>
			<div style={{ width: "100%", height: "100%", position: "relative" }}>
				<HistoriesList />
			</div>
		</GeneralLayout>
	);
};

export default HistoriesListMain;
