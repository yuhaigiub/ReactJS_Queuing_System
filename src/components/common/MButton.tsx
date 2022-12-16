import React from "react";
import { Button } from "antd";

const MButton: React.FC<Props> = ({ content, onClickFn, type, htmlType, extraStyle }) => {
	const standardStyle: React.CSSProperties = {
		borderRadius: "8px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "18px 50px",
		width: "12rem",
		height: "2.5em",
		fontSize: "1.2em",
		fontWeight: 700,
	};
	return (
		<Button
			type={type}
			htmlType={htmlType}
			onClick={onClickFn}
			style={{
				...standardStyle,
				...extraStyle,
			}}>
			{content}
		</Button>
	);
};

export default MButton;

interface Props {
	content: React.ReactNode | string;
	onClickFn?: () => void;
	type?: "default" | "link" | "text" | "ghost" | "primary" | "dashed" | undefined;
	htmlType?: "submit" | "button" | "reset" | undefined;
	extraStyle?: React.CSSProperties;
}
