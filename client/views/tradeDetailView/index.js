import { Button, PageHeader } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { read } from '../../api/trade';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DeleteTrade from './DeleteTrade';

const TradeDetailView = () => {
	const [trade, setTrade] = useState(null);

	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const trade = await read(id);
			setTrade(trade);
		};
		fetchData();
	}, []);

	const history = useHistory();

	return (
		<>
			{trade && (
				<div key={trade._id}>
					<PageHeader
						title={trade.symbol}
						extra={[
							<Button
								key="edit"
								icon={<EditOutlined />}
								onClick={() =>
									history.push(`/trades/${id}/edit`)
								}
							>
								Edit
							</Button>,
							<DeleteTrade tradeId={id} />,
						]}
					/>
				</div>
			)}
		</>
	);
};

export default TradeDetailView;
