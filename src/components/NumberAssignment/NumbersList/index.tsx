import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/store";
import { fetchNumbers, getAllNumbersSelector } from "../../../features/numbersSlice";

import GeneralLayout from "../../common/GeneralLayout";
import MBreadcrumb from "../../common/MBreadcrumb";
import NumbersList from "./NumbersList";

const NumbersListMain = () => {
	const dispatch = useAppDispatch();
	const data = useAppSelector(getAllNumbersSelector);

	useEffect(() => {
		dispatch(fetchNumbers())
			.unwrap()
			.catch((error: Error) => console.log(error.message));
	}, [dispatch]);

	return (
		<>
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
								{ label: "Cấp số", link: "/main/numbers" },
								{ label: "Danh sách cấp số", link: "" },
							]}
						/>
					</div>
					<div style={{ fontSize: "1.5em", color: "#FF7506", fontWeight: "700" }}>
						Quản lý cấp số
					</div>
				</div>
				<div style={{ width: "100%", height: "100%", position: "relative" }}>
					<NumbersList serverData={data} />
				</div>
			</GeneralLayout>
		</>
	);
};

export default NumbersListMain;
