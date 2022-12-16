import React from "react";

import { useAppDispatch } from "../../../../app/store";
import { addRole } from "../../../../features/rolesSlice";
import GeneralLayout from "../../../common/GeneralLayout";
import MBreadcrumb from "../../../common/MBreadcrumb";
import RoleStandardFormMain from "../RoleStandardForm";

const AddRoleMain = () => {
	const dispatch = useAppDispatch();

	const onSubmit = (values: any) => {
		dispatch(addRole(values))
			.unwrap()
			.catch((error: Error) => console.log(error));
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
							{ label: "Cài đặt hệ thống", link: "/main/settings/roles" },
							{ label: "Quản lý vai trò", link: "/main/settings/roles" },
							{ label: "Thêm vai trò", link: "" },
						]}
					/>
				</div>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>
					Danh sách vai trò
				</div>
			</div>
			<div style={{ width: "100%", height: "100%", position: "relative" }}>
				<RoleStandardFormMain type="add" onSubmit={onSubmit} />
			</div>
		</GeneralLayout>
	);
};

export default AddRoleMain;
