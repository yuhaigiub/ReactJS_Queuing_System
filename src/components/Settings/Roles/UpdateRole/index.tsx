import React from "react";

import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../app/store";
import { getRoleByKeySelector, updateRole } from "../../../../features/rolesSlice";
import GeneralLayout from "../../../common/GeneralLayout";
import MBreadcrumb from "../../../common/MBreadcrumb";
import RoleStandardFormMain from "../RoleStandardForm";

const UpdateRoleMain = () => {
	const { key } = useParams();
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => getRoleByKeySelector(state, key as string));

	const onSubmit = (values: any) => {
		dispatch(updateRole({ ...data, ...values }))
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
							{ label: "Cài đặt hệ thống", link: "/main/settings/roles" },
							{ label: "Quản lý vai trò", link: "/main/settings/roles" },
							{ label: "Cập nhật vai trò", link: "" },
						]}
					/>
				</div>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>
					Danh sách vai trò
				</div>
			</div>
			<div style={{ width: "100%", height: "100%", position: "relative" }}>
				<RoleStandardFormMain data={data} type="update" onSubmit={onSubmit} />
			</div>
		</GeneralLayout>
	);
};

export default UpdateRoleMain;
