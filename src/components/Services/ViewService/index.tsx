import React from "react";

import GeneralLayout from "../../common/GeneralLayout";
import MBreadcrumb from "../../common/MBreadcrumb";
import ViewService from "./ViewService";

const ViewServiceMain = () => {
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
							{ label: "Dịch vụ", link: "/main/services" },
							{ label: "Danh sách dịch vụ", link: "/main/services" },
							{ label: "Chi tiết", link: "" },
						]}
					/>
				</div>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>
					Quản lý dịch vụ
				</div>
			</div>
			<div style={{ width: "100%", height: "100%", position: "relative", paddingRight: "6%" }}>
				<ViewService />
			</div>
		</GeneralLayout>
	);
};

export default ViewServiceMain;
