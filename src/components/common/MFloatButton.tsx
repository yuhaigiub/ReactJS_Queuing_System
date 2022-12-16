import React from "react";
import { useNavigate } from "react-router-dom";

const MFloatButton: React.FC<Props> = ({ text, link, icon, textSize, top, id }) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => {
				navigate(link);
			}}
			style={{
				position: "absolute",
				padding: "0.5em",
				top: top !== undefined ? top : "16%",
				right: 0,
				zIndex: "1000",
				width: "4rem",
				borderRadius: "9px 5px 5px 9px",
				aspectRatio: "6/7",
				overflow: "hidden",
				backgroundColor: "#FFF2E7",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-evenly",
				alignItems: "center",
				cursor: "pointer",
				boxShadow: "5px 5px 10px 3px #b0acac",
			}}>
			<div
				style={{
					fill: "#FF7506",
					color: "#FF7506",
				}}>
				<div id={id === undefined ? "" : id}>{icon}</div>
			</div>
			<div
				style={{
					textAlign: "center",
					fontSize: textSize !== undefined ? textSize : "0.9em",
					lineHeight: "normal",
					color: "#FF7506",
					fontWeight: 700,
				}}>
				{text}
			</div>
		</div>
	);
};

export default MFloatButton;

interface Props {
	text: string;
	link: string;
	icon: React.ReactNode;
	textSize?: string;
	top?: string;
	id?: string;
}
