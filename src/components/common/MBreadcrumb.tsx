import React from "react";

import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const MBreadcrumb: React.FC<Props> = ({ items }) => {
	return (
		<Breadcrumb
			separator={
				<span style={{ color: "#000", fontSize: "1.2em", fontWeight: "700" }}>{">"}</span>
			}>
			{items.map((item) => {
				return (
					<Breadcrumb.Item key={item.label}>
						{item.link !== "" ? (
							<Link
								to={item.link}
								style={{ color: "#7E7D88", fontSize: "1.2em", fontWeight: "700" }}>
								{item.label}
							</Link>
						) : (
							<span style={{ color: "#FF7506", fontSize: "1.2em", fontWeight: "700" }}>
								{item.label}
							</span>
						)}
					</Breadcrumb.Item>
				);
			})}
		</Breadcrumb>
	);
};

export default MBreadcrumb;

interface Props {
	items: {
		link: string;
		label: string;
	}[];
}
