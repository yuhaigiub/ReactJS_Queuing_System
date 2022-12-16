import React from "react";
import "../index.css";

import AreaPlot from "../AreaPlot";
import MLeftInfoCard from "../../common/MLeftInfoCard";

// type
import { LeftInfoCard } from "../../../features/interfaces";
import MBreadcrumb from "../../common/MBreadcrumb";

const LeftChildDashboard: React.FC<Props> = ({ month, year, data }) => {
	return (
		<div id="middle-grid-container">
			<div id="middle-first">
				<div
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}>
					<div>
						<MBreadcrumb items={[{ label: "Dashboard", link: "" }]} />
					</div>
					<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>
						Biểu đồ cấp số
					</div>
				</div>
			</div>
			<div id="middle-second">
				{data.map((item) => {
					return <MLeftInfoCard item={item} key={item.name} />;
				})}
			</div>
			<div id="middle-third" className="card-general">
				<AreaPlot month={month} year={year} />
			</div>
		</div>
	);
};

export default LeftChildDashboard;

interface Props {
	month: string;
	year: string;
	data: LeftInfoCard[];
}
