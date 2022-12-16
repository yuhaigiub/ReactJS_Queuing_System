import React from "react";

import { useAppSelector } from "../../../app/store";
import { getAllServicesSelector } from "../../../features/servicesSlice";

import GeneralLayout from "../../common/GeneralLayout";
import MBreadcrumb from "../../common/MBreadcrumb";
import ServicesList from "./ServicesList";

const ServicesListMain = () => {
	const data = useAppSelector(getAllServicesSelector);

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
							{ label: "Danh sách dịch vụ", link: "" },
						]}
					/>
				</div>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>
					Quản lý dịch vụ
				</div>
			</div>
			<div style={{ width: "100%", height: "100%", position: "relative" }}>
				<ServicesList serverData={data} />
			</div>
		</GeneralLayout>
	);
};

export default ServicesListMain;
