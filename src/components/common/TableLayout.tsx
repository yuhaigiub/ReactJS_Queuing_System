import React from "react";

const TableLayout: React.FC<Props> = ({ searches, table }) => {
	return (
		<div style={{ paddingRight: "7%" }}>
			<div style={{ padding: "1em 2em 0 2em" }}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: "2em",
						fontWeight: 600,
					}}>
					{searches}
				</div>
				<div style={{ margin: 0, height: "70%" }}>{table}</div>
			</div>
		</div>
	);
};

export default TableLayout;

interface Props {
	searches: JSX.Element;
	table: React.ReactNode;
}
