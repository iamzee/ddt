import React from 'react';
import { Card, Table, Tag } from 'antd';
import moment from 'moment';

const Summary = ({ trade }) => {
	const tableColumns = [
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			render: text => `${moment(text).format('DD-MM-YYYY')}`,
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
			title: 'Average Buy Price',
			dataIndex: 'averageBuyPrice',
			key: 'averageBuyPrice',
			render: text => `₹${text}`,
		},
		{
			title: 'Average Sell Price',
			dataIndex: 'averageSellPrice',
			key: 'averageSellPrice',
			render: text => `₹${text}`,
		},
		{
			title: 'Return',
			dataIndex: 'return',
			key: 'return',
			render: text => `₹${text}`,
		},
		{
			title: 'Return %',
			dataIndex: 'returnPercent',
			key: 'returnPercent',
			render: text => `${text}%`,
		},
		{
			title: 'Result',
			dataIndex: 'result',
			key: 'result',
			render: text => <Tag>{text}</Tag>,
		},
	];

	const tableDate = [trade];

	return (
		<Card>
			<Table
				dataSource={tableDate}
				columns={tableColumns}
				pagination={false}
			/>
		</Card>
	);
};

export default Summary;
