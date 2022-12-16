import { notification } from "antd";
import type { MenuProps } from "antd";

import MButton from "./MButton";

export const openNotification: (data: {
	key: string;
	message: string;
	description?: string;
}) => void = (data) => {
	const btn = (
		<MButton
			content="Tiếp tục"
			type="primary"
			onClickFn={() => {
				notification.close(data.key);
			}}
		/>
	);
	notification.open({
		...data,
		duration: 2,
		btn,
	});
};

export type MenuItem = Required<MenuProps>["items"][number];

export function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group"
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}
