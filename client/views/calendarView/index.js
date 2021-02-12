import { Calendar, PageHeader, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { fetchDailyReport, fetchMonthlyReport } from '../../api/report';
import moment from 'moment';

const { Option } = Select;

const CalendarView = () => {
	const [data, setData] = useState(null);
	const [metric, setMetric] = useState('return');
	const [calendar, setCalendar] = useState({
		value: moment.now(),
		mode: 'month',
	});

	const fetchData = async () => {
		if (calendar.mode === 'month') {
			const data = await fetchDailyReport(
				moment(calendar.value).month() + 1
			);
			setData(data);
		} else if (calendar.mode === 'year') {
			const data = await fetchMonthlyReport(
				moment(calendar.value).year()
			);
			setData(data);
		}
	};

	useEffect(() => {
		fetchData();
	}, [calendar]);

	console.log(data);

	function onPanelChange(value, mode) {
		setCalendar({ value, mode });
	}

	const dateCellRenderer = value => {
		const date = value.format('YYYY-MM-DD');

		if (data[date]) {
			return (
				<div
					style={{
						display: 'grid',
						placeItems: 'center',
						width: '100%',
						height: '100%',
					}}
				>
					<h1
						style={{
							fontSize: '24px',
							color:
								data[date][metric]['value'] > 0
									? '#00917c'
									: '#c70039',
						}}
					>
						{`${data[date][metric]['prefix'] || ''}${
							data[date][metric]['value']
						}${data[date][metric]['suffix'] || ''}`}
					</h1>
				</div>
			);
		}
	};

	const monthCellRenderer = value => {
		const month = value.month();

		if (data[month]) {
			return (
				<div
					style={{
						display: 'grid',
						placeItems: 'center',
						width: '100%',
						height: '100%',
					}}
				>
					<h1
						style={{
							fontSize: '24px',
							color:
								data[month][metric]['value'] > 0
									? '#00917c'
									: '#c70039',
						}}
					>
						{`${data[month][metric]['prefix'] || ''}${
							data[month][metric]['value']
						}${data[month][metric]['suffix'] || ''}`}
					</h1>
				</div>
			);
		}
	};

	return (
		<div>
			<PageHeader title="Calendar" />
			<Select
				defaultValue="return"
				onChange={value => setMetric(value)}
				style={{ marginBottom: '16px', width: 250 }}
			>
				<Option value="trades">Trades</Option>
				<Option value="wins">Wins</Option>
				<Option value="loses">Loses</Option>
				<Option value="winRate">Win Rate</Option>
				<Option value="loseRate">Lose Rate</Option>
				<Option value="return">Return</Option>
				<Option value="returnPercent">Return %</Option>
				<Option value="netReturn">Net Return</Option>
				<Option value="averageReturnPerTrade">
					Average Return Per Trade
				</Option>
				<Option value="averageReturnPercentPerTrade">
					Average Return % Per Trade
				</Option>
				<Option value="averageNetReturnPerTrade">
					Average Net Return Per Trade
				</Option>
			</Select>
			{data && (
				<Calendar
					onPanelChange={onPanelChange}
					dateCellRender={dateCellRenderer}
					monthCellRender={monthCellRenderer}
				/>
			)}
		</div>
	);
};

export default CalendarView;
