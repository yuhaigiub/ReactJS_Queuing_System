import React from "react";

import { useAppSelector } from "../../app/store";
import { getAllNumbersSelector } from "../../features/numbersSlice";

// type
import { Number_, Report } from "../../features/interfaces";

import GeneralLayout from "../common/GeneralLayout";
import ReportsList from "./ReportsList";
import { useFetchNumbers } from "../../app/dataFetchingHooks";
import MBreadcrumb from "../common/MBreadcrumb";

const ReportsMain = () => {
	useFetchNumbers();
	const unfilteredData: Number_[] = useAppSelector(getAllNumbersSelector);

	const data: Report[] = unfilteredData.map((record) => {
		return {
			key: record.key,
			number: record.number,
			serviceId: record.serviceId,
			time: record.time,
			useStatus: record.useStatus,
			source: record.source,
		};
	});

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
							{ label: "Báo cáo", link: "/main/reports" },
							{ label: "Lập báo cáo", link: "" },
						]}
					/>
				</div>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>
					Quản lý báo cáo
				</div>
			</div>
			<div style={{ width: "100%", height: "100%", position: "relative" }}>
				<ReportsList serverData={data} />
			</div>
		</GeneralLayout>
	);
};

export default ReportsMain;
