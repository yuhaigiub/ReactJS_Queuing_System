import React from "react";
import { useNavigate } from "react-router-dom";

import type { LeftInfoCard } from "../../features/interfaces";

const MLeftInfoCard: React.FC<Props> = ({ item }) => {
	const navigate = useNavigate();
	return (
		<div
			onClick={() => {
				navigate("/main/numbers");
			}}
			className="card-general"
			style={{
				width: "23%",
				padding: "0.75em 1em 0.25em 1em",
				display: "flex",
				flexDirection: "column",
				rowGap: "1em",
				cursor: "pointer",
			}}>
			<div style={{ display: "flex", alignItems: "center", columnGap: "1em" }}>
				<div
					style={{
						width: "3.2em",
						aspectRatio: "1/1",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: item.background,
						borderRadius: "50%",
						overflow: "hidden",
						color: "#535261",
					}}>
					{item.icon}
				</div>
				<div style={{ maxWidth: "80px", fontSize: "1.1em", fontWeight: "700" }}>{item.name}</div>
			</div>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<div style={{ fontSize: "2em", fontWeight: "700" }}>{item.amount}</div>
				<div
					style={{
						fontSize: "0.8em",
						background:
							item.statistics.type === "increase"
								? "rgba(255, 149, 1, 0.15)"
								: "rgba(231, 63, 63, 0.15)",
						color: item.statistics.type === "increase" ? "#FF9138" : "#E73F3F",
						borderRadius: "10px",
						padding: "0.1em 0.5em",
						fontWeight: 700,
					}}>
					{(item.statistics.type === "increase" ? "+" : "-") + item.statistics.amount + "%"}
				</div>
			</div>
		</div>
	);
};

export default MLeftInfoCard;

interface Props {
	item: LeftInfoCard;
}
