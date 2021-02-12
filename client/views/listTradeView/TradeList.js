import React from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Tag } from 'antd';
import moment from 'moment';

const TradeList = ({ trades, onPageChange, count, currentPage }) => {
	const tableColumns = [
		{
			title: 'Result',
			dataIndex: 'result',
			key: 'result',
			render: text => (
				<Tag color={text === 'WIN' ? 'success' : 'error'}>{text}</Tag>
			),
		},
		{
			title: 'Symbol',
			dataIndex: 'symbol',
			key: 'symbol',
		},
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			render: text => moment(text).format('Do MMM YY'),
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: 'Avg. Buy Price',
			dataIndex: 'averageBuyPrice',
			key: 'averageBuyPrice',
			render: text => `₹${text}`,
		},
		{
			title: 'Avg. Sell Price',
			dataIndex: 'averageSellPrice',
			key: 'averageSellPrice',
			render: text => `₹${text}`,
		},
		{
			title: 'Return',
			dataIndex: 'return',
			keey: 'return',
			render: text => `₹${text}`,
		},
		{
			title: 'Return%',
			dataIndex: 'returnPercent',
			key: 'returnPercent',
			render: text => `${text}%`,
		},
	];

	const history = useHistory();

	return (
		<div>
			<Table
				dataSource={trades}
				columns={tableColumns}
				pagination={{
					current: currentPage,
					onChange: onPageChange,
					pageSize: 10,
					total: count,
				}}
				onRow={(record, rowIndex) => {
					return {
						onClick: e => {
							history.push(`/trades/${record._id}`);
						},
					};
				}}
			/>
		</div>
	);
};

export default TradeList;
