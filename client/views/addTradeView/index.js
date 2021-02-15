import { PageHeader } from 'antd';
import React from 'react';
import { create } from '../../api/trade';
import TradeForm from '../../components/tradeForm';

const AddTradeView = () => {
	const handleSubmit = async payload => {
		await create(payload);
	};

	return (
		<div>
			<PageHeader
				title="Add Trade"
				style={{ paddingLeft: 0, paddingTop: 0 }}
			/>
			<TradeForm handleSubmit={handleSubmit} />
		</div>
	);
};

export default AddTradeView;
