import { PageHeader } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { edit, read } from '../../api/trade';
import TradeForm from '../../components/tradeForm';
import moment from 'moment';

const EditTradeView = () => {
	const [data, setData] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			let data = await read(id);

			let buys = [];
			let sells = [];

			data.timeline.forEach(t => {
				t.time = moment(t.time);
				if (t.action === 'BUY') {
					delete t['action'];
					delete t['_id'];
					buys.push(t);
				} else if (t.action === 'SELL') {
					delete t['action'];
					delete t['_id'];
					sells.push(t);
				}
			});

			data = {
				...data,
				buys,
				sells,
			};

			setData(data);
		};

		fetchData();
	}, []);

	const handleSubmit = async payload => {
		await edit(id, payload);
	};

	return (
		<div>
			<PageHeader
				title="Edit Trade"
				style={{ paddingLeft: 0, paddingTop: 0 }}
			/>
			{data && <TradeForm trade={data} handleSubmit={handleSubmit} />}
		</div>
	);
};

export default EditTradeView;
