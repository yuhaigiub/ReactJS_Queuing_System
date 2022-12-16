import React from "react";
import { useAppDispatch } from "../../../../app/store";
import { addAccount } from "../../../../features/accountsSlice";
import { incrementNumberOfUserLocal } from "../../../../features/rolesSlice";
import AccountStandardForm from "../AccountStandardForm";

// type
import { Account } from "../../../../features/interfaces";
import GeneralLayout from "../../../common/GeneralLayout";
import MBreadcrumb from "../../../common/MBreadcrumb";

const AddAccountMain = () => {
	const dispatch = useAppDispatch();

	const onSubmit = (values: Account) => {
		dispatch(addAccount(values))
			.unwrap()
			.catch((error: Error) => console.log(error.message));
		dispatch(incrementNumberOfUserLocal(values.role));
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
							{ label: "Cài đặt hệ thống", link: "/main/settings/accounts" },
							{ label: "Quản lý tài khoản", link: "/main/settings/accounts" },
							{ label: "Thêm tài khoản", link: "" },
						]}
					/>
				</div>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>
					Danh sách vai trò
				</div>
			</div>
			<div style={{ width: "100%", height: "100%", position: "relative" }}>
				<AccountStandardForm type="add" onSubmit={onSubmit} />
			</div>
		</GeneralLayout>
	);
};

export default AddAccountMain;
