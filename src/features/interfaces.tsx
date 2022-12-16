export interface Device {
	key: React.Key;
	deviceId: string;
	deviceName: string;
	ip: string;
	actionStatus: ActionStatusType;
	connectionStatus: ConnectionStatusType;
	services: string[]; // TODO
	deviceType: DeviceType;
	username: string;
	password: string;
}

export interface Service {
	key: React.Key;
	serviceId: string;
	serviceName: string;
	description: string;
	actionStatus: ActionStatusType;
	autoIncrease: boolean;
	autoIncreaseFrom?: string | undefined;
	autoIncreaseTo?: string | undefined;
	current: number;
	prefix: boolean;
	prefixValue?: string | undefined;
	suffix: boolean;
	suffixValue?: string | undefined;
	resetEveryday: boolean;
	timeCreated: string;
}

export interface Number_ {
	key: React.Key;
	number: string;
	customerName: string;
	serviceId: string;
	time: string;
	expireDate: string;
	useStatus: UseStatusType;
	source: string;
}

export interface Report {
	key: React.Key;
	number: string;
	serviceId: string;
	time: string;
	useStatus: UseStatusType;
	source: string;
}

export interface Role {
	key: React.Key;
	roleName: string;
	numberOfUsers: number;
	description: string;
	roles: {
		A: {
			X: boolean;
			Y: boolean;
			Z: boolean;
		};
		B: {
			X: boolean;
			Y: boolean;
			Z: boolean;
		};
		C: {
			X: boolean;
			Y: boolean;
			Z: boolean;
		};
	};
	timeCreated: string;
}

export interface Account {
	key: React.Key;
	uid: string;
	username: string;
	fullName: string;
	tel: string;
	password: string;
	email: string;
	role: string;
	actionStatus: ActionStatusType;
	timeCreated: string;
}

export type ActionStatusType = "Ngừng hoạt động" | "Hoạt động";
export type UseStatusType = "Đang chờ" | "Đã sử dụng" | "Bỏ qua";
export type ConnectionStatusType = "Kết nối" | "Mất kết nối";
export type DeviceType = "Kiosk" | "Display counter";
// table options
export type ActionStatusOptions = "Tất cả" | ActionStatusType;
export type UseStatusOptions = "Tất cả" | UseStatusType;
export type ConnectionStatusOptions = "Tất cả" | ConnectionStatusType;
export type SourceOptions = "Tất cả" | "Kiosk" | "Hệ thống";

// non-store types
export interface DeviceLabel {
	deviceId: string;
	deviceName: string;
	username: string;
	ip: string;
	password: string;
	services: string;
}

export type StatisticType = "increase" | "decrease";
export interface LeftInfoCard {
	name: string;
	amount: number;
	statistics: {
		type: StatisticType;
		amount: number;
	};
	icon: JSX.Element;
	background: string;
}
