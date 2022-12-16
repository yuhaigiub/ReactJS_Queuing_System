import React from "react";
import Icon from "@ant-design/icons";

import "./index.css";

//type
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

import {
	DashboardSVG,
	DevicesSVG,
	ServicesSVG,
	NumbersSVG,
	ReportSVG,
	SettingsSVG,
	DashboardIcon1SVG,
	DashboardIcon2SVG,
	DashboardIcon3SVG,
	DashboardIcon4SVG,
	AddSVG,
	DownloadSVG,
	UpdateSVG,
	BackSVG,
} from "./iconsSVG";

export const DashboardIcon = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={DashboardSVG} {...props} className="my-icon" />
);

export const DevicesIcon = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={DevicesSVG} {...props} className="my-icon" />
);

export const ServicesIcon = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={ServicesSVG} {...props} className="my-icon" />
);

export const NumbersIcon = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={NumbersSVG} {...props} className="my-icon" />
);

export const ReportIcon = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={ReportSVG} {...props} className="my-icon" />
);

export const SettingsIcon = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={SettingsSVG} {...props} className="my-icon" />
);

export const DashboardIcon1 = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={DashboardIcon1SVG} {...props} className="my-icon" />
);

export const DashboardIcon2 = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={DashboardIcon2SVG} {...props} className="my-icon" />
);

export const DashboardIcon3 = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={DashboardIcon3SVG} {...props} className="my-icon" />
);

export const DashboardIcon4 = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={DashboardIcon4SVG} {...props} className="my-icon" />
);

export const AddIcon = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={AddSVG} {...props} className="my-icon" />
);

export const DownloadIcon = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={DownloadSVG} {...props} className="my-icon" />
);

export const UpdateIcon = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={UpdateSVG} {...props} className="my-icon" />
);

export const BackIcon = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={BackSVG} {...props} className="my-icon" />
);
