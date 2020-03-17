import React, { useState, useEffect, useRef } from 'react';
import { Table, Tag } from 'antd';

const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	},
	getCheckboxProps: record => ({
		disabled: record.name === 'Disabled User', // Column configuration not to be checked
		name: record.name,
	}),
};


const VirtualTable = (props) => {
	const { total2, columns, tabledate, changePage } = props
	const [selectionType, setSelectionType] = useState('checkbox');
	const [current, setcurrent] = useState(1)
	return (
		<div>
			<Table
				rowSelection={{
					type: selectionType,
					...rowSelection,
				}}
				
				rowKey={(record, index) => index}
				columns={columns}
				dataSource={tabledate}
				pagination={{  // 分页
					simple: true,
					current: current,
					total: total2,
					onChange: changePage,
				}}

			/>
		</div>
	);
};
export default VirtualTable;
