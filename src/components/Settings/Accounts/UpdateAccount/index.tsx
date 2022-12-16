import React from "react";
import { useParams } from "react-router-dom";
import { useFetchAccounts } from "../../../../app/dataFetchingHooks";

import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { getAccountByKeySelector, updateAccount } from "../../../../features/accountsSlice";
import { Account } from "../../../../features/interfaces";
import {
	decrementNumberOfUserLocal,
	incrementNumberOfUserLocal,
} from "../../../../features/rolesSlice";
import GeneralLayout from "../../../common/GeneralLayout";
import MBreadcrumb from "../../../common/MBreadcrumb";

import AccountStandardForm from "../AccountStandardForm";

const UpdateAccountMain = () => {
	const { key } = useParams();
	const dispatch = useAppDispatch();

	useFetchAccounts();
	const data = useAppSelector((state) => getAccountByKeySelector(state, key as string)) as Account;

	const onSubmit = (values: any) => {
		dispatch(updateAccount({ newData: { ...data, ...values }, oldRole: data.role }))
			.unwrap()
			.catch((error: Error) => console.log(error.message));
		
		if (data.role !== values.role) {
			dispatch(incrementNumberOfUserLocal(values.role));
			dispatch(decrementNumberOfUserLocal(data.role));
		}
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
							{ label: "Cập nhật", link: "" },
						]}
					/>
				</div>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>
					Danh sách vai trò
				</div>
			</div>
			<div style={{ width: "100%", height: "100%", position: "relative" }}>
				<AccountStandardForm type="update" data={data} onSubmit={onSubmit} />
			</div>
		</GeneralLayout>
	);
};

export default UpdateAccountMain;
