import React, { useEffect, useState } from 'react';
import { PageHeader, Select, Card } from 'antd';
import { fetchWeekdayReport } from '../../api/report';
import { ResponsiveBar } from '@nivo/bar';

const { Option } = Select;

const WeekdayReportView = () => {
	const [data, setData] = useState(null);
	const [metric, setMetric] = useState('return');
	const [chartData, setChartData] = useState();

	const getWeekdayName = num => {
		switch (num) {
			case '1': {
				return 'Monday';
			}
			case '2': {
				return 'Tuesday';
			}
			case '3': {
				return 'Wednesday';
			}
			case '4': {
				return 'Thursday';
			}
			case '5': {
				return 'Friday';
			}
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchWeekdayReport();
			setData(data);
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (data) {
			var chartData = [];
			Object.keys(data).forEach(key => {
				chartData.push({
					weekday: getWeekdayName(key),
					[metric]: data[key][metric]['value'],
					suffix: data[key][metric]['suffix'],
					prefix: data[key][metric]['prefix'],
				});
			});
			setChartData(chartData);
		}
	}, [metric, data]);

	return (
		<div>
			<PageHeader
				title="Weekday Report"
				style={{ paddingLeft: '0px', paddingTop: '0px' }}
				extra={[
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
					</Select>,
				]}
			/>

			<Card>
				<div style={{ height: '400px' }}>
					{chartData && (
						<ResponsiveBar
							data={chartData}
							indexBy="weekday"
							keys={[metric]}
							margin={{
								top: 16,
								right: 16,
								bottom: 40,
								left: 50,
							}}
							animate={true}
							colors={item => {
								if (item.value > 0) {
									return '#28df99';
								} else {
									return '#fe7171';
								}
							}}
							borderWidth={2}
							borderColor={{
								from: 'color',
								modifiers: [['darker', 1.6]],
							}}
							label={d => {
								return `${d.data.prefix || ''}${d.value}${
									d.data.suffix || ''
								}`;
							}}
							labelTextColor="#000"
							isInteractive={false}
						/>
					)}
				</div>
			</Card>
		</div>
	);
};

export default WeekdayReportView;
