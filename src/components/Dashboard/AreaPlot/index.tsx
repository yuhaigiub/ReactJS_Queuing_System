import React, { useState, useMemo, useEffect } from "react";
import "./index.css";

import { useAppSelector } from "../../../app/store";
import { getAllNumbersSelector } from "../../../features/numbersSlice";
import { format } from "date-fns";

import { Area } from "@ant-design/plots";
import { Select } from "antd";

const AreaPlot: React.FC<Props> = ({ month, year }) => {
	const numbers = useAppSelector(getAllNumbersSelector);
	const numbersData = useMemo(() => {
		return numbers.map((data) => {
			const dMonth = format(new Date(data.time), "MM");
			const dYear = format(new Date(data.time), "yyyy");
			const dDay = format(new Date(data.time), "dd");
			return { day: dDay, month: dMonth, year: dYear, value: 1 };
		});
	}, [numbers]);

	const daysData = useMemo(() => {
		const filteredData = numbersData.filter((data) => {
			return data.month === month && data.year === year;
		});

		const initialValue = Array.from(Array(31).keys()).map((value) => {
			return { x: value + 1, y: 0 };
		});
		const reducedData = filteredData.reduce((result: { x: number; y: number }[], data) => {
			const index = result.findIndex((r) => r.x === parseInt(data.day));
			if (index === -1) {
				result = [...result, { x: parseInt(data.day), y: 0 }];
			} else {
				result[index].y += 1;
			}
			return result;
		}, initialValue);

		return reducedData.map((value) => {
			return {
				x: value.x.toString(),
				y: value.y,
			};
		});
	}, [month, year, numbersData]);

	const weeksData = useMemo(() => {
		const filteredData = numbersData.filter((data) => {
			return data.month === month && data.year === year;
		});

		const initialValue = [
			{ x: "Tuần 1", y: 0 },
			{ x: "Tuần 2", y: 0 },
			{ x: "Tuần 3", y: 0 },
			{ x: "Tuần 4", y: 0 },
		];
		const reducedData = filteredData.reduce((result: { x: string; y: number }[], data) => {
			const dayNum = parseInt(data.day);
			if (dayNum < 8) {
				result[0].y += 1;
			} else if (dayNum < 15) {
				result[1].y += 1;
			} else if (dayNum < 22) {
				result[2].y += 1;
			} else {
				result[3].y += 1;
			}

			return result;
		}, initialValue);

		return reducedData;
	}, [month, year, numbersData]);

	const monthsData = useMemo(() => {
		const filteredData = numbersData.filter((data) => {
			return data.year === year;
		});

		const initialValue = Array.from(Array(12).keys()).map((value) => {
			return { x: value + 1, y: 0 };
		});
		const reducedData = filteredData.reduce((result: { x: number; y: number }[], data) => {
			const index = result.findIndex((r) => r.x === parseInt(data.month));
			if (index === -1) {
				result = [...result, { x: parseInt(data.month), y: 0 }];
			} else {
				result[index].y += 1;
			}
			return result;
		}, initialValue);

		return reducedData.map((value) => {
			return {
				x: value.x.toString(),
				y: value.y,
			};
		});
	}, [year, numbersData]);

	const [type, setType] = useState("ngày");
	const [data, setData] = useState<any>(daysData);

	useEffect(() => {
		switch (type) {
			case "ngày":
				setData(daysData);
				break;
			case "tuần":
				setData(weeksData);
				break;
			case "tháng":
				setData(monthsData);
				break;
		}
	}, [daysData, weeksData, monthsData, type]);

	return (
		<div id="dashboard-container">
			<div id="dashboard-select-type">
				<div>
					<div style={{ fontSize: "1.4em", fontWeight: 700 }}>Bảng thống kê theo {type}</div>
					<div style={{ color: "#A9A9B0", fontWeight: 600 }}>
						{type !== "tháng" ? `Tháng ${month}/${year}` : `Năm ${year}`}
					</div>
				</div>
				<div
					style={{
						fontSize: "1.1em",
						display: "flex",
						columnGap: "10px",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<label htmlFor="type" style={{ fontWeight: 600 }}>
						Xem theo
					</label>
					<Select
						style={{ minWidth: "100px" }}
						value={type}
						onChange={(value) => {
							setType(value);
						}}
						options={options}
					/>
				</div>
			</div>

			<Area
				smooth
				data={data}
				xField="x"
				yField="y"
				xAxis={{
					range: [0, 1],
					tickCount: 7,
					title: {
						text: type,
						position: "end",
						spacing: 5,
						style: {
							fontWeight: 700,
						},
					},
				}}
				yAxis={{
					title: {
						text: "số lượng",
						position: "end",
						spacing: 5,
						style: {
							fontWeight: 700,
						},
					},
				}}
				tooltip={{
					fields: ["y"],
					customContent: (title, data) => {
						return `<div class="my-custom-tooltip">${data[0]?.value || ""}</div>`;
					},
				}}
				areaStyle={() => {
					return {
						fill: "l(90) 0:#0000ff 1:#fff",
					};
				}}
				autoFit={true}
				limitInPlot={true}
				padding={[90, 50, 50, 60]}
			/>
		</div>
	);
};

export default AreaPlot;

interface Props {
	month: string;
	year: string;
}

const options = [
	{
		value: "ngày",
		label: "ngày",
	},
	{
		value: "tuần",
		label: "tuần",
	},
	{
		value: "tháng",
		label: "tháng",
	},
];
