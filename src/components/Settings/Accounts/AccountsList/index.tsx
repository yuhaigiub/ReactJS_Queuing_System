import React from "react";
import { useFetchAccounts } from "../../../../app/dataFetchingHooks";
import { useAppSelector } from "../../../../app/store";
import { getAllAccountsSelector } from "../../../../features/accountsSlice";

import GeneralLayout from "../../../common/GeneralLayout";
import MBreadcrumb from "../../../common/MBreadcrumb";
import AccountsList from "./AccountsList";

const AccountsListMain = () => {
	useFetchAccounts();
	const data = useAppSelector(getAllAccountsSelector);

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
							{ label: "Cài đặt hệ thống", link: "/main/settings/accounts" },
							{ label: "Quản lý tài khoản", link: "" },
						]}
					/>
				</div>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>
					Danh sách tài khoản
				</div>
			</div>
			<div style={{ width: "100%", height: "100%", position: "relative" }}>
				<AccountsList serverData={data} />
			</div>
		</GeneralLayout>
	);
};

export default AccountsListMain;
