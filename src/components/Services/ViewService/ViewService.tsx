import React from "react";
import "./index.css";

import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/store";
import { getServiceByKeySelector } from "../../../features/servicesSlice";

import { Select, DatePicker } from "antd";

// type
import { Number_, Service, UseStatusType } from "../../../features/interfaces";
import MFloatButton from "../../common/MFloatButton";
import { BackIcon, UpdateIcon } from "../../common/Icons/icons";
import TableLayout from "../../common/TableLayout";
import MTable from "../../common/MTable";
import { getNumberByServiceIdSelector } from "../../../features/numbersSlice";
import { ColumnsType } from "antd/lib/table";

const ViewService: React.FC = () => {
	const { key } = useParams();

	const data = useAppSelector((state) => getServiceByKeySelector(state, key as string)) as Service;
	const numbersData = useAppSelector((state) =>
		getNumberByServiceIdSelector(state, data.serviceId)
	) as Number_[];

	const columns: ColumnsType<Number_> = [
		{
			title: "Số thứ tự",
			dataIndex: "number",
			key: "number",
			render: (text) => <>{text}</>,
		},

		{
			title: "Trạng thái",
			dataIndex: "useStatus",
			key: "useStatus",
			render: (text: UseStatusType) => {
				switch (text) {
					case "Đang chờ":
						return (
							<span
								style={{
									display: "flex",
									justifyItems: "center",
									columnGap: "0.5em",
									fontWeight: 500,
								}}>
								<span style={{ color: "green", lineHeight: "0.7em", fontSize: "1.5em" }}>•</span>
								{text}
							</span>
						);
					case "Đã sử dụng":
						return (
							<span
								style={{
									display: "flex",
									justifyItems: "center",
									columnGap: "0.5em",
									fontWeight: 500,
								}}>
								<span style={{ color: "red", lineHeight: "0.7em", fontSize: "1.5em" }}>•</span>
								{text}
							</span>
						);
					default:
						return (
							<span
								style={{
									display: "flex",
									justifyItems: "center",
									columnGap: "0.5em",
									fontWeight: 500,
								}}>
								<span style={{ color: "gray", lineHeight: "0.7em", fontSize: "1.5em" }}>•</span>
								{text}
							</span>
						);
				}
			},
		},
	];

	const table = <MTable data={numbersData} columns={columns} />;

	const searches = (
		<div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
			<div style={{ display: "flex", columnGap: "1em" }}>
				<div>
					<label style={{ display: "block" }}>Trạng thái</label>
					<Select style={{ width: "10em" }} onChange={(value) => {}} options={[]} />
				</div>
				<div>
					<label style={{ display: "block" }}>Chọn thời gian</label>
					<div>
						<span>
							<DatePicker style={{ width: "9em" }} />
						</span>
						<span>{">"}</span>
						<span>
							<DatePicker style={{ width: "9em" }} />
						</span>
					</div>
				</div>
			</div>
			<div>
				<label style={{ display: "block" }}>Từ khóa</label>
				<input
					className="keyword-input-field"
					onChange={(e) => {}}
					placeholder="Nhập từ khóa"
					style={{
						width: "12em",
						height: "30px",
						borderRadius: "5px",
						border: "0.8px solid rgba(200, 200, 200, 0.85)",
					}}
				/>
			</div>
		</div>
	);

	return (
		<>
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					columnGap: "2em",
					padding: "2em",
				}}>
				<div
					style={{
						width: "30%",
						backgroundColor: "white",
						padding: "1em",
						display: "flex",
						flexDirection: "column",
						rowGap: "1em",
						borderRadius: "9px",
						boxShadow: "2px 2px 8px rgba(70, 64, 67, 0.1)",
					}}>
					<div style={{ display: "flex", flexDirection: "column", rowGap: "1em" }}>
						<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: 700 }}>
							Thông tin dịch vụ
						</div>
						<div>
							<strong>Mã dịch vụ:</strong> {data.serviceId}
						</div>
						<div>
							<strong>Tên dịch vụ:</strong> {data.serviceName}
						</div>
						<div>
							<strong>Mô tả:</strong> {data.description}
						</div>
					</div>
					<div
						className="number-wrapper"
						style={{ display: "flex", flexDirection: "column", rowGap: "1em" }}>
						<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: 700 }}>
							Quy tắc cấp số
						</div>
						{data.autoIncrease && (
							<div style={{ display: "flex", alignItems: "center" }}>
								<div className="number-textdiv-width">
									<strong>Tăng tự động:</strong>
								</div>
								<div style={{ display: "flex", columnGap: "0.5em", alignItems: "center" }}>
									<input
										style={{ width: "50px" }}
										readOnly
										value={data.autoIncreaseFrom as string}
									/>
									<div>đến</div>
									<input style={{ width: "50px" }} readOnly value={data.autoIncreaseTo as string} />
								</div>
							</div>
						)}
						{data.prefix && (
							<div style={{ display: "flex", alignItems: "center" }}>
								<div className="number-textdiv-width">
									<strong>Prefix:</strong>
								</div>
								<input style={{ width: "50px" }} readOnly value={data.prefixValue as string} />
							</div>
						)}
						{data.suffix && (
							<div style={{ display: "flex", alignItems: "center" }}>
								<div className="number-textdiv-width">
									<strong>Suffix:</strong>
								</div>
								<input style={{ width: "50px" }} readOnly value={data.suffixValue as string} />
							</div>
						)}
						{data.resetEveryday && (
							<div style={{ display: "flex", alignItems: "center" }}>
								<div className="number-textdiv-width">
									<strong>Reset mỗi ngày</strong>
								</div>
							</div>
						)}
					</div>
				</div>
				<div
					style={{
						width: "70%",
						backgroundColor: "white",
						padding: "2em",
						borderRadius: "9px",
						boxShadow: "2px 2px 8px rgba(70, 64, 67, 0.1)",
					}}>
					<TableLayout searches={searches} table={table} />
				</div>
			</div>

			<MFloatButton
				link={`/main/services/update/${key}`}
				text="Cập nhật danh sách"
				icon={<UpdateIcon style={{ stroke: "#FF7506", color: "#FF7506", fontSize: "2em" }} />}
				textSize="0.7em"
			/>
			<MFloatButton
				id="special-back-float-button"
				link="/main/services"
				text="Quay lại"
				icon={<BackIcon style={{ stroke: "#FF7506", color: "#FF7506", fontSize: "2em" }} />}
				textSize="0.9em"
				top="30%"
			/>
		</>
	);
};

export default ViewService;
