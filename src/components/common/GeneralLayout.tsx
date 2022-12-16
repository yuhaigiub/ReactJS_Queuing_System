import React from "react";

const GeneralLayout: React.FC<Props> = ({ children }) => {
	return (
		<div style={{ width: "100%", height: "100%", display: "grid", gridTemplateRows: "15% 85%" }}>
			{children}
		</div>
	);
};

export default GeneralLayout;

interface Props {
	children?: React.ReactNode;
}
