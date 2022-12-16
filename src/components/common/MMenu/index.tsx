import React, { useState, useEffect } from "react";
import "./index.css";

import { useLocation, useNavigate } from "react-router-dom";

import { Menu } from "antd";
import type { MenuProps } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import {
	DashboardIcon,
	DevicesIcon,
	NumbersIcon,
	ReportIcon,
	ServicesIcon,
	SettingsIcon,
} from "../Icons/icons";

import { getItem, MenuItem } from "../utils";

const MMenu: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [selectedKey, setSelectedKey] = useState("dashboard");

	const onMenuClick: MenuProps["onClick"] = (e) => {
		// console.log("click", e.key);
		navigate(`/main/${e.key}`);
	};

	useEffect(() => {
		const token = location.pathname.split("/");
		if (token.indexOf("dashboard") !== -1) setSelectedKey("dashboard");
		else if (token.indexOf("devices") !== -1) setSelectedKey("devices");
		else if (token.indexOf("services") !== -1) setSelectedKey("services");
		else if (token.indexOf("numbers") !== -1) setSelectedKey("numbers");
		else if (token.indexOf("report") !== -1) setSelectedKey("report");
		else if (token.indexOf("settings") !== -1) {
			if (token.indexOf("roles") !== -1) setSelectedKey("settings/roles");
			else if (token.indexOf("accounts") !== -1) setSelectedKey("settings/accounts");
			else if (token.indexOf("history") !== -1) setSelectedKey("settings/history");
		}
	}, [location]);

	return (
		<Menu
			selectedKeys={[selectedKey]}
			theme="light"
			items={items}
			mode="vertical"
			onClick={onMenuClick}
			expandIcon={<MenuOutlined />}
		/>
	);
};

export default MMenu;

const items: MenuItem[] = [
	getItem("Dashboard", "dashboard", <DashboardIcon style={{ fontSize: "1em" }} />),
	getItem("Thiết bị", "devices", <DevicesIcon style={{ fontSize: "1em" }} />),
	getItem("Dịch vụ", "services", <ServicesIcon style={{ fontSize: "1em" }} />),

	getItem("Cấp số", "numbers", <NumbersIcon style={{ fontSize: "1em" }} />),

	getItem("Báo cáo", "report", <ReportIcon style={{ fontSize: "1em" }} />),
	getItem("Cài đặt hệ thống", "settings", <SettingsIcon style={{ fontSize: "1em" }} />, [
		getItem("Quản lý vai trò", "settings/roles"),
		getItem("Quản lý tài khoản", "settings/accounts"),
		getItem("Nhật ký người dùng", "settings/history"),
	]),
];
