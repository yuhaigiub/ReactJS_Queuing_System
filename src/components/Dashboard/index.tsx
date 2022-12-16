import React, { useState, useMemo } from "react";
import "./index.css";

import { format } from "date-fns";

import DashboardLayout from "./Layout/layout";

import LeftChildDashboard from "./Layout/LeftChildDashboard";
import RightChildDashboard from "./Layout/RightChildDashboard";
import { useAppSelector } from "../../app/store";
import { getAllDevicesSelector } from "../../features/devicesSlice";
import {
	DashboardIcon1,
	DashboardIcon2,
	DashboardIcon3,
	DashboardIcon4,
	DevicesIcon,
	NumbersIcon,
	ServicesIcon,
} from "../common/Icons/icons";
import { getAllServicesSelector } from "../../features/servicesSlice";
import { getAllNumbersSelector } from "../../features/numbersSlice";
import { LeftInfoCard } from "../../features/interfaces";

const DashboardMain = () => {
	const devices = useAppSelector(getAllDevicesSelector);
	const devicesStatus = useMemo(() => {
		return devices.reduce(
			(status, device) => {
				switch (device.actionStatus) {
					case "Hoạt động":
						status[0].amount += 1;
						break;
					case "Ngừng hoạt động":
						status[1].amount += 1;
						break;
				}
				return status;
			},
			[
				{ name: "Đang hoạt động", amount: 0, color: "#FF7506" },
				{ name: "Ngừng hoạt động", amount: 0, color: "#7E7D88" },
				{ name: "Tổng cộng", amount: devices.length, color: "" },
			]
		);
	}, [devices]);
	console.log(devices);

	const devicesData = useMemo(() => {
		return {
			name: "Thiết bị",
			icon: <DevicesIcon />,
			amount: devices.length,
			status: devicesStatus,
			link: "/main/devices",
		};
	}, [devices, devicesStatus]);

	//

	const services = useAppSelector(getAllServicesSelector);
	const servicesStatus = useMemo(() => {
		return services.reduce(
			(status, service) => {
				switch (service.actionStatus) {
					case "Hoạt động":
						status[0].amount += 1;
						break;
					case "Ngừng hoạt động":
						status[1].amount += 1;
						break;
				}
				return status;
			},
			[
				{ name: "Đang hoạt động", amount: 0, color: "#4277FF" },
				{ name: "Ngừng hoạt động", amount: 0, color: "#7E7D88" },
				{ name: "Tổng cộng", amount: services.length, color: "" },
			]
		);
	}, [services]);

	const servicesData = useMemo(() => {
		return {
			name: "Dịch vụ",
			icon: <ServicesIcon />,
			amount: services.length,
			status: servicesStatus,
			link: "/main/services",
		};
	}, [services, servicesStatus]);

	//

	const numbers = useAppSelector(getAllNumbersSelector);
	const numbersStatus = useMemo(() => {
		return numbers.reduce(
			(status, service) => {
				switch (service.useStatus) {
					case "Đã sử dụng":
						status[0].amount += 1;
						break;
					case "Đang chờ":
						status[1].amount += 1;
						break;
					case "Bỏ qua":
						status[2].amount += 1;
						break;
				}
				return status;
			},
			[
				{ name: "Đã sử dụng", amount: 0, color: "#35C75A" },
				{ name: "Đang chờ", amount: 0, color: "#7E7D88" },
				{ name: "Bỏ qua", amount: 0, color: "#F178B6" },
				{ name: "Tổng cộng", amount: numbers.length, color: "" },
			]
		);
	}, [numbers]);

	const numbersData = useMemo(() => {
		return {
			name: "Cấp số",
			icon: <NumbersIcon />,
			amount: numbers.length,
			status: numbersStatus,
			link: "/main/numbers",
		};
	}, [numbers, numbersStatus]);

	//

	const rightChildData = [devicesData, servicesData, numbersData];
	const leftChildData: LeftInfoCard[] = [
		{
			name: "Số thứ tự đã cấp",
			amount: numbers.length,
			statistics: { type: "increase", amount: 32.41 },
			icon: <DashboardIcon1 style={{ stroke: "#6493F9", color: "#6493F9", fontSize: "1.9em" }} />,
			background: "rgba(102, 149, 251, 0.15)",
		},
		{
			name: "Số thứ tự đã sử dụng",
			amount: numbersStatus[0].amount,
			statistics: { type: "decrease", amount: 32.41 },
			icon: <DashboardIcon2 style={{ stroke: "#35C75A", color: "#35C75A", fontSize: "2em" }} />,
			background: "rgba(53, 199, 90, 0.15)",
		},
		{
			name: "Số thứ tự đang chờ",
			amount: numbersStatus[1].amount,
			statistics: { type: "increase", amount: 56.41 },
			icon: <DashboardIcon3 style={{ stroke: "#FFAC6A", color: "#FFAC6A", fontSize: "3.8em" }} />,
			background: "rgba(255, 172, 106, 0.15)",
		},
		{
			name: "Số thứ tự đã bỏ qua",
			amount: numbersStatus[2].amount,
			statistics: { type: "decrease", amount: 22.41 },
			icon: <DashboardIcon4 style={{ stroke: "#F86D6D", color: "#F86D6D", fontSize: "2em" }} />,
			background: "rgba(248, 109, 109, 0.15)",
		},
	];

	const [month, setMonth] = useState<string>(format(new Date(), "MM"));
	const [year, setYear] = useState<string>(format(new Date(), "yyyy"));

	const leftChild = <LeftChildDashboard month={month} year={year} data={leftChildData} />;
	const rightChild = (
		<RightChildDashboard setMonth={setMonth} setYear={setYear} data={rightChildData} />
	);

	return <DashboardLayout leftChild={leftChild} rightChild={rightChild} />;
};

export default DashboardMain;
