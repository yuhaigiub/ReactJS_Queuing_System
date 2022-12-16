import React from "react";
import logo from "../../images/Logo_Alta.png";

const MLogo: React.FC<Props> = ({ width, extraStyle }) => {
	return (
		<img
			src={logo}
			alt="cannot load"
			width={width}
			style={{
				...extraStyle,
			}}
		/>
	);
};

export default MLogo;

interface Props {
	width: string | number | undefined;
	extraStyle?: React.CSSProperties;
}
