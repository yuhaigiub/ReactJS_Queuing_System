import { Calendar } from "antd";

import React from "react";

const DashboardCalendar: React.FC<Props> = ({ setMonth, setYear }) => {
	return (
		<Calendar
			fullscreen={false}
			className="calendar-5-rows"
			headerRender={({ value, type, onChange, onTypeChange }) => {
				return (
					<div className="calendar-heading">
						<div
							className="arrow"
							onClick={() => {
								const newDate = value.clone().subtract(1, "M");
								setMonth(newDate.format("MM"));
								setYear(newDate.format("YYYY"));
								onChange(newDate);
							}}>
							{"<"}
						</div>
						<div className="date">{value.format("DD MMM YYYY")}</div>
						<div
							className="arrow"
							onClick={() => {
								const newDate = value.clone().add(1, "M");
								setMonth(newDate.format("MM"));
								setYear(newDate.format("YYYY"));
								onChange(newDate);
							}}>
							{">"}
						</div>
					</div>
				);
			}}
		/>
	);
};

export default DashboardCalendar;

interface Props {
	setMonth: (value: string) => void;
	setYear: (value: string) => void;
}
