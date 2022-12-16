import React from "react";

import { useParams } from "react-router-dom";
import { useFetchNumbers, useFetchServices } from "../../../app/dataFetchingHooks";
import { useAppSelector } from "../../../app/store";
import { Number_ } from "../../../features/interfaces";
import { getNumberByKeySelector } from "../../../features/numbersSlice";
import { getServiceByIdSelector } from "../../../features/servicesSlice";

const ViewNumber = () => {
	const { key } = useParams();

	useFetchNumbers();
	const data = useAppSelector((state) => getNumberByKeySelector(state, key as string)) as Number_;

	useFetchServices();
	const serviceName = useAppSelector((state) =>
		getServiceByIdSelector(state, data.serviceId as string)
	)?.serviceName;

	return (
		<div
			className="view-card-1"
			style={{ display: "flex", flexDirection: "column", rowGap: "2em" }}>
			<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: 700 }}>Thông tin cấp số</div>
			<div style={{ display: "flex", columnGap: "15em" }}>
				<div style={{ display: "flex", flexDirection: "column", rowGap: "1em" }}>
					<div>
						<strong>Họ tên:</strong> {data.customerName}
					</div>
					<div>
						<strong>Dịch vụ:</strong> {serviceName}
					</div>
					<div>
						<strong>Số thứ tự:</strong> {data.number}
					</div>
					<div>
						<strong>Thời gian cấp:</strong> {data.time}
					</div>
					<div>
						<strong>Hạn sử dụng:</strong> {data.expireDate}
					</div>
				</div>
				<div style={{ display: "flex", flexDirection: "column", rowGap: "1em" }}>
					<div>
						<strong>Nguồn cấp:</strong> {data.source}
					</div>
					<div>
						<strong>Trạng thái:</strong> {data.useStatus}
					</div>
					<div>
						<strong>Số điện thoại:</strong> 0123456789
					</div>
					<div>
						<strong>Địa chỉ email:</strong> 1@gmail.com
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewNumber;
