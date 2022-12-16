import React from "react";
import { useAppDispatch } from "../../../app/store";
import { addService } from "../../../features/servicesSlice";
import GeneralLayout from "../../common/GeneralLayout";
import MBreadcrumb from "../../common/MBreadcrumb";

import ServiceStandardForm from "../ServiceStandardForm";

const AddServiceMain = () => {
	const dispatch = useAppDispatch();

	const onSubmit = (values: any) => {
		console.log(values);
		dispatch(addService(values))
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
							{ label: "Thêm dịch vụ", link: "" },
						]}
					/>
				</div>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>
					Quản lý dịch vụ
				</div>
			</div>
			<div style={{ width: "100%", height: "100%", position: "relative" }}>
				<ServiceStandardForm type="add" onSubmit={onSubmit} />
			</div>
		</GeneralLayout>
	);
};

export default AddServiceMain;
