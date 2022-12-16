import React from "react";
import { useFetchRoles } from "../../../../app/dataFetchingHooks";
import { useAppSelector } from "../../../../app/store";
import { getAllRolesSelector } from "../../../../features/rolesSlice";

import GeneralLayout from "../../../common/GeneralLayout";
import MBreadcrumb from "../../../common/MBreadcrumb";
import RolesList from "./RolesList";

const RolesListMain = () => {
	useFetchRoles();
	const data = useAppSelector(getAllRolesSelector);

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
							{ label: "Quản lý vai trò", link: "" },
						]}
					/>
				</div>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>
					Quản lý vai trò
				</div>
			</div>
			<div style={{ width: "100%", height: "100%", position: "relative" }}>
				<RolesList serverData={data} />
			</div>
		</GeneralLayout>
	);
};

export default RolesListMain;
