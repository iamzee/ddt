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
			<PageHeader title="Add Trade" />
			<TradeForm handleSubmit={handleSubmit} />
		</div>
	);
};

export default AddTradeView;
