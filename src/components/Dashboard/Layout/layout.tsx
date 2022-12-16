import React from "react";

const DashboardLayout: React.FC<Props> = ({ leftChild, rightChild }) => {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "grid",
				gridTemplateColumns: "68.75% 32.25%",
				overflow: "hidden",
			}}>
			<div style={{ height: "100%", backgroundColor: "#F6F6F6", padding: "2em" }}>{leftChild}</div>
			<div style={{ height: "100%", backgroundColor: "white", padding: "2em" }}>{rightChild}</div>
		</div>
	);
};

export default DashboardLayout;

interface Props {
	leftChild?: React.ReactNode;
	rightChild?: React.ReactNode;
}
