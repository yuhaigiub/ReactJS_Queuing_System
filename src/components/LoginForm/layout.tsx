import React from "react";

import MLogo from "../common/MLogo";

const FormLayout: React.FC<Props> = ({ leftChild, rightChild }) => {
	return (
		<div
			style={{ width: "100vw", height: "100vh", display: "grid", gridTemplateColumns: "35% 65%" }}>
			<div style={{ backgroundColor: "#F6F6F6" }}>
				<div
					style={{
						paddingTop: "20%",
						margin: "auto",
						width: "80%",
						height: "100%",
					}}>
					<div
						style={{
							marginBottom: "10%",
							display: "flex",
							justifyContent: "center",
						}}>
						<MLogo width={180} />
					</div>
					{leftChild}
				</div>
			</div>
			<div
				style={{
					position: "relative",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<div>{rightChild}</div>
			</div>
		</div>
	);
};

export default FormLayout;

interface Props {
	leftChild?: React.ReactNode;
	rightChild?: React.ReactNode;
}
