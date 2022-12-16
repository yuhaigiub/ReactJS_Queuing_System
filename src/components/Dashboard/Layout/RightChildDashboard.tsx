import React from "react";
import "../index.css";

import DashboardCalendar from "../DashboardCalendar/DashboardCalendar";
import DashboardProgress from "../DashboardProgress";
import { useNavigate } from "react-router-dom";

const RightChildDashboard: React.FC<Props> = ({ setMonth, setYear, data }) => {
	const navigate = useNavigate();

	return (
		<div id="right-grid-container">
			<div id="right-first">
				<div
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}>
					<div></div>
					<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>Tổng quan</div>
				</div>
			</div>
			<div id="right-second">
				{data.map((item) => {
					const itemStatus = item.status.slice(0, item.status.length - 1);
					const total = itemStatus.reduce((total, field: any) => total + field.amount, 0);
					const percentage = Math.floor((itemStatus[0].amount / total) * 100).toString() + "%";
					return (
						<div
							key={item.name}
							className="card-general right-card"
							onClick={() => {
								navigate(item.link);
							}}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									height: "100%",
									width: "45%",
									cursor: "pointer",
								}}>
								<div style={{ padding: "0.75em", height: "100%" }}>
									<DashboardProgress data={item.status} total={total} percentage={percentage} />
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										height: "100%",
									}}>
									<div style={{ fontSize: "1.5em", fontWeight: 700, lineHeight: "25px" }}>
										{total}
									</div>
									<div
										style={{
											fontWeight: 700,
											color: item.status[0].color,
											stroke: item.status[0].color,
											strokeWidth: "1.5px",
											fontSize: "1em",
										}}>
										{item.icon}
										<span style={{ paddingLeft: "0.2em" }}>{item.name}</span>
									</div>
								</div>
							</div>
							<ul
								style={{
									padding: "0 0.5em 0 1em",
									display: "flex",
									flexDirection: "column",
									columnGap: "1em",
									justifyContent: "center",
									height: "100%",
									width: "50%",
								}}>
								{itemStatus.map((i) => {
									return (
										<li
											key={i.name}
											style={{
												listStyle: "none",
											}}>
											<div
												style={{
													display: "flex",
													justifyContent: "space-between",
													alignItems: "center",
													fontSize: "1em",
													fontWeight: 600,
													lineHeight: "normal",
												}}>
												<div style={{ display: "flex", alignItems: "center" }}>
													<span
														style={{
															marginRight: "0.3em",
															display: "flex",
															alignItems: "center",
															color: i.color,
															fontSize: "1.6em",
															lineHeight: "auto",
														}}>
														•
													</span>
													<span style={{ color: "#7E7D88" }}>{i.name}</span>
												</div>
												<div
													style={{
														color: item.status[0].color,
														fontWeight: 700,
													}}>
													{i.amount}
												</div>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
					);
				})}
			</div>
			<div id="right-third" className="card-general right-card">
				<DashboardCalendar setMonth={setMonth} setYear={setYear} />
			</div>
		</div>
	);
};

export default RightChildDashboard;

interface Props {
	setMonth: (value: string) => void;
	setYear: (value: string) => void;
	data: {
		name: string;
		icon: React.ReactNode;
		amount: number;
		status: { name: string; amount: number; color: string }[];
		link: string;
	}[];
}
