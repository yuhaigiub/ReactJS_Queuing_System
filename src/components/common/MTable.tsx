import React from "react";

import { Table } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

// type
import type { PaginationProps } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import type { ColumnsType } from "antd/es/table";

const pageSize = 9;

const MTable: React.FC<Props> = ({ data, columns }) => {
	const paginationConfig: TablePaginationConfig = {
		showLessItems: false,
		defaultCurrent: 1,
		total: data.length,
		showSizeChanger: false,
		pageSize: pageSize,
		itemRender: itemRender,
		style: {
			marginTop: "2em",
		},
	};
	return (
		<Table
			size="small"
			columns={columns}
			dataSource={data}
			bordered
			pagination={paginationConfig}
		/>
	);
};

export default MTable;

interface Props {
	data: any[];
	columns: ColumnsType<any>;
}

const itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
	if (type === "prev") {
		return <CaretLeftOutlined />;
	}
	if (type === "next") {
		return <CaretRightOutlined />;
	}
	return originalElement;
};
