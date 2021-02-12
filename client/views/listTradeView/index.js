import React, { useEffect, useState } from 'react';
import { PageHeader, DatePicker, Select } from 'antd';
import { list } from '../../api/trade';
import { list as fetchSetups } from '../../api/setup';
import TradeList from './TradeList';

const { RangePicker } = DatePicker;
const { Option } = Select;

const ListTradeView = () => {
	const [tradeListData, setTradeListData] = useState(null);
	const [date, setDate] = useState(null);
	const [setup, setSetup] = useState(null);
	const [setups, setSetups] = useState(null);
	const [type, setType] = useState(null);

	const fetchTrades = async (page, date, setup, type) => {
		const data = await list(page, date, setup, type);
		setTradeListData(data);
	};

	const fetchSetupList = async () => {
		const setups = await fetchSetups();
		setSetups(setups);
	};

	useEffect(() => {
		fetchSetupList();
	}, []);

	useEffect(() => {
		fetchTrades(1, date, setup, type);
	}, [date, setup, , type]);

	const onPageChange = (page, pageSize) => {
		fetchTrades(page, date, setup, type);
	};

	return (
		<div>
			<PageHeader
				title="Trades"
				style={{ paddingLeft: '0px' }}
				extra={[
					<RangePicker onChange={date => setDate(date)} />,
					<Select
						placeholder="Setup"
						style={{ width: 200 }}
						allowClear
						onSelect={option => setSetup(option)}
						onClear={() => setSetup(null)}
					>
						{setups &&
							setups.map(s => (
								<Option value={s._id} key={s._id}>
									{s.title}
								</Option>
							))}
					</Select>,
					<Select
						placeholder="Type"
						allowClear
						style={{ width: 100 }}
						onSelect={option => setType(option)}
						onClear={() => setType(null)}
					>
						<Option value="LONG" key="LONG">
							LONG
						</Option>
						<Option value="SHORT" key="SHORT">
							SHORT
						</Option>
					</Select>,
				]}
			/>
			{tradeListData && (
				<div>
					<TradeList
						trades={tradeListData.trades}
						onPageChange={onPageChange}
						count={tradeListData.count}
						currentPage={tradeListData.currentPage}
					/>
				</div>
			)}
		</div>
	);
};

export default ListTradeView;
