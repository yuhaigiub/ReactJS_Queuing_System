import React from "react";

import { Routes, Route } from "react-router-dom";

import LayoutMain from "./LayoutMain";
import LoginMain from "./components/LoginForm";
import DashboardMain from "./components/Dashboard";
import DevicesListMain from "./components/Devices/DevicesList";
import AddDeviceMain from "./components/Devices/AddDevice";
import UpdateDeviceMain from "./components/Devices/UpdateDevice";
import ViewDeviceMain from "./components/Devices/ViewDevice";
import ServicesListMain from "./components/Services/ServicesList";
import NumbersListMain from "./components/NumberAssignment/NumbersList";
import ReportsMain from "./components/Reports";
import RolesListMain from "./components/Settings/Roles/RolesList";
import AccountsListMain from "./components/Settings/Accounts/AccountsList";
import AddRoleMain from "./components/Settings/Roles/AddRole";
import HistoriesListMain from "./components/Settings/History";
import AddServiceMain from "./components/Services/AddService";
import UpdateServiceMain from "./components/Services/UpdateService";
import ViewServiceMain from "./components/Services/ViewService";
import AddNumberMain from "./components/NumberAssignment/AddNumber";
import ViewNumberMain from "./components/NumberAssignment/ViewNumber";
import UpdateRoleMain from "./components/Settings/Roles/UpdateRole";
import UpdateAccountMain from "./components/Settings/Accounts/UpdateAccount";
import AddAccountMain from "./components/Settings/Accounts/AddAccount";
import ProfileMain from "./components/Profile";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<LoginMain />} />
			
			<Route path="main" element={<LayoutMain />}>
				<Route path="dashboard" element={<DashboardMain />} />
				<Route path="profile/:key" element={<ProfileMain />} />
				
				<Route path="devices">
					<Route index element={<DevicesListMain />} />
					<Route path="add" element={<AddDeviceMain />} />
					<Route path="update/:key" element={<UpdateDeviceMain />} />
					<Route path="view/:key" element={<ViewDeviceMain />} />
				</Route>

				<Route path="services">
					<Route index element={<ServicesListMain />} />
					<Route path="add" element={<AddServiceMain />} />
					<Route path="update/:key" element={<UpdateServiceMain />} />
					<Route path="view/:key" element={<ViewServiceMain />} />
				</Route>

				<Route path="numbers">
					<Route index element={<NumbersListMain />} />
					<Route path="add" element={<AddNumberMain />} />
					<Route path="view/:key" element={<ViewNumberMain />} />
				</Route>

				<Route path="report">
					<Route index element={<ReportsMain />} />
				</Route>

				<Route path="settings">
					<Route path="roles">
						<Route index element={<RolesListMain />} />
						<Route path="add" element={<AddRoleMain />} />
						<Route path="update/:key" element={<UpdateRoleMain />} />
					</Route>

					<Route path="accounts">
						<Route index element={<AccountsListMain />} />
						<Route path="add" element={<AddAccountMain />} />
						<Route path="update/:key" element={<UpdateAccountMain />} />
					</Route>

					<Route path="history" element={<HistoriesListMain />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
