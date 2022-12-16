import React, { useState } from "react";

import { addDays, format } from "date-fns";
import { useFetchServices } from "../../../app/dataFetchingHooks";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { getAllServicesSelector, incrementServiceCurrent } from "../../../features/servicesSlice";
import { useNavigate } from "react-router-dom";

import { Select, Form } from "antd";
import MButton from "../../common/MButton";
import { Account, Service } from "../../../features/interfaces";
import { addNumber } from "../../../features/numbersSlice";
import { getAccountByUIDSelector } from "../../../features/accountsSlice";
import { useUserUID } from "../../../app/AuthContext";

const AddNumber = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const userID = useUserUID();

	const [hasNumber, setHasNumber] = useState<boolean>(false);
	const [numberAssigned, setNumberAssigned] = useState<string>("");
	const [serviceId, setServiceId] = useState<string>("");

	useFetchServices();
	const availableServices = useAppSelector(getAllServicesSelector);
	const serviceOptions = availableServices.map((service) => {
		return { label: service.serviceName, value: service.serviceId };
	});

	const currentUser = useAppSelector((state) => getAccountByUIDSelector(state, userID)) as Account;

	const onAssignNumberClick = (value: any) => {
		const service = availableServices.find(
			(service) => service.serviceId === value.service
		) as Service;

		let newNumber = "";
		if (service.prefix === true) {
			newNumber += service.prefixValue;
		}

		let middleNumber = service.current.toString();
		while (middleNumber.length < 4) middleNumber = "0" + middleNumber;
		newNumber += middleNumber;

		if (service.suffix === true) {
			newNumber += service.suffixValue;
		}

		const newData = {
			number: newNumber,
			customerName: currentUser.username,
			serviceId: value.service,
			source: "Kiosk",
			time: new Date().toString(),
			expireDate: new Date(addDays(new Date(), 1)).toString(),
		};

		setNumberAssigned(newNumber);
		setServiceId(value.service);

		dispatch(addNumber(newData));
		dispatch(incrementServiceCurrent(service.key as string));

		setHasNumber(true);
	};

	return (
		<div
			className="view-card-1"
			style={{
				display: "flex",
				justifyContent: "center",
			}}>
			{hasNumber === false ? (
				<Form
					onFinish={onAssignNumberClick}
					style={{
						width: "50%",
						height: "50%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						rowGap: "1em",
						paddingTop: "10%",
					}}>
					<div style={{ fontSize: "2em", color: "#FF7506", fontWeight: 700 }}>Cấp số mới</div>
					<div style={{ fontSize: "1.1em", color: "#000", fontWeight: 700 }}>
						Dịch vụ khách hàng lựa chọn
					</div>
					<Form.Item
						name="service"
						rules={[{ required: true, message: "Vui lòng chọn dịch vụ" }]}
						style={{ width: "70%" }}>
						<Select options={serviceOptions} />
					</Form.Item>

					<div style={{ display: "flex", columnGap: "2em", paddingTop: "2em" }}>
						<MButton
							content="Hủy bỏ"
							onClickFn={() => {
								navigate("/main/numbers");
							}}
						/>
						<MButton content="In số" htmlType="submit" type="primary" />
					</div>
				</Form>
			) : (
				<div
					style={{
						width: "35%",
						// height: "50%",
						margin: "5% 0",
						border: "2px solid #FF9138",
						borderRadius: "9px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}>
					<div
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "space-evenly",
							padding: "5% 0",
							rowGap: "1em",
						}}>
						<div style={{ fontWeight: 700, fontSize: "1.5em" }}>Số thứ tự được cấp</div>
						<div style={{ color: "#FF7506", fontSize: "3em" }}>{numberAssigned}</div>
						<div>
							<strong>Dịch vụ:</strong>{" "}
							{availableServices.find((service) => service.serviceId === serviceId)?.serviceName}
						</div>
					</div>
					<div
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#FF9138",
							borderRadius: "0 0 9px 9px",
							padding: "2% 0",
						}}>
						<div>
							<strong>Thời gian cấp:</strong> {format(new Date(), "kk:mm dd/LL/yyyy")}
						</div>
						<div>
							<strong>Hạn sử dụng:</strong>{" "}
							{format(new Date(addDays(new Date(), 1)), "kk:mm dd/LL/yyyy")}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddNumber;
