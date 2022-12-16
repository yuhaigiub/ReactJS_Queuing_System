import React from "react";
import "./index.css";

import GeneralLayout from "../common/GeneralLayout";
import MBreadcrumb from "../common/MBreadcrumb";
import { useUserUID } from "../../app/AuthContext";
import { getAccountByUIDSelector } from "../../features/accountsSlice";
import { useAppSelector } from "../../app/store";
import { Account, Role } from "../../features/interfaces";
import { getRoleByKeySelector } from "../../features/rolesSlice";

const ProfileMain = () => {
	const uid = useUserUID();
	const account = useAppSelector((state) => getAccountByUIDSelector(state, uid)) as Account;
	const role = useAppSelector((state) => getRoleByKeySelector(state, account.role)) as Role;

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
					<MBreadcrumb items={[{ label: "Thông tin cá nhân", link: "" }]} />
				</div>
				<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}></div>
			</div>
			<div
				style={{
					width: "100%",
					height: "100%",
					position: "relative",
					padding: "2em 10% 2em 2em",
				}}>
				<div
					style={{
						width: "100%",
						height: "60%",
						background: "white",
						borderRadius: "12px",
						boxShadow: "2px 2px 8px rgba(70, 64, 67, 0.1)",
						display: "flex",
					}}>
					<div
						style={{
							width: "30%",
							height: "100%",
							padding: "2em",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "space-between",
							rowGap: "1em",
						}}>
						<div
							style={{
								height: "80%",
								aspectRatio: "1/1",
								background: "blue",
								borderRadius: "50%",
							}}></div>
						<div style={{ fontWeight: 700, fontSize: "3em", lineHeight: "normal" }}>
							{account.fullName}
						</div>
					</div>
					<div
						id="profile-text-wrapper"
						style={{
							padding: "2em",
							width: "70%",
							height: "100%",
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gridTemplateRows: "1fr 1fr 1fr",
						}}>
						<div>
							<label>Tên người dùng</label>
							<input value={account.fullName} readOnly />
						</div>
						<div>
							<label>Tên đăng nhập</label>
							<input value={account.username} readOnly />
						</div>
						<div>
							<label>Số điện thoại</label>
							<input value={account.tel} readOnly />
						</div>

						<div>
							<label>Mật khẩu</label>
							<input value={account.password} readOnly />
						</div>
						<div>
							<label>Email</label>
							<input value={account.email} readOnly />
						</div>
						<div>
							<label>Vai trò</label>
							<input value={role.roleName} readOnly />
						</div>
					</div>
				</div>
			</div>
		</GeneralLayout>
	);
};

export default ProfileMain;
