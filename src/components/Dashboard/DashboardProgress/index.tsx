import React from "react";
import { RadialBar } from "@ant-design/plots";

const DashboardProgress: React.FC<Props> = ({ data, total, percentage }) => {
	const reverseData = [...data].reverse();

	return (
		<RadialBar
			data={reverseData}
			width={70}
			height={70}
			xField="name"
			yField="amount"
			xAxis={false}
			tooltip={false}
			maxAngle={360}
			colorField="name"
			minBarWidth={3}
			color={({ name }) => {
				return data.find((d) => d.name === name)?.color || "#fff";
			}}
			barBackground={{
				style: {
					fill: "rgba(0, 0, 0, 0.4)",
				},
			}}
			barStyle={{
				lineCap: "round",
			}}
			radius={1}
			innerRadius={0.5}
			annotations={[
				{
					type: "text",
					position: ["50%", "52%"],
					content: percentage,
					style: {
						fontFamily: "Nunito",
						textAlign: "center",
						fontSize: 14,
						fontWeight: 700,
					},
				},
			]}
			interactions={[{ type: "tooltip", enable: false }]}
		/>
	);
};

export default DashboardProgress;

interface Props {
	data: Record<string, any>[];
	total: number;
	percentage: string;
}
