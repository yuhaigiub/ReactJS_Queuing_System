import React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { getServiceByKeySelector, updateService } from "../../../features/servicesSlice";

import ServiceStandardForm from "../ServiceStandardForm";

// type
import type { Service } from "../../../features/interfaces";
import GeneralLayout from "../../common/GeneralLayout";
import MBreadcrumb from "../../common/MBreadcrumb";

const UpdateServiceMain = () => {
	const { key } = useParams();
	const dispatch = useAppDispatch();

	const data = useAppSelector((state) => getServiceByKeySelector(state, key as string)) as Service;

	const onSubmit = (values: any) => {
		dispatch(updateService({ ...data, ...values }))
			.unwrap()
			.catch((error: Error) => console.log(error.message));
	};
	return (
		<GeneralLayout>
			<div
				style={{
					width: "100%",
					height: "100%",
					padding: "2em 2em 0 2em",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}>
				<div>
					<MBreadcrumb
						items={[
							{ label: "Dịch vụ", link: "/main/services" },
							{ label: "Danh sách dịch vụ", link: "/main/services" },
							{ label: "Cập nhật", link: "" },
						]}
					/>
				</div>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>
					Quản lý dịch vụ
				</div>
			</div>
			<div style={{ width: "100%", height: "100%", position: "relative" }}>
				<ServiceStandardForm type="update" onSubmit={onSubmit} data={data} />
			</div>
		</GeneralLayout>
	);
};

export default UpdateServiceMain;
