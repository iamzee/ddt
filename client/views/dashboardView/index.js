import React, { useState, useEffect } from 'react';
import { Select, Card, PageHeader } from 'antd';
import { getDashboardData } from '../../api/dashboard';
import { ResponsiveLine } from '@nivo/line';
import _ from 'lodash';

const { Option } = Select;

const DashboardView = () => {
	const [metric, setMetric] = useState('return');
	const [data, setData] = useState(null);
	const [chartData, setChartData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getDashboardData();
			console.log(data);
			setData(data);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const chartData = [];

		if (data) {
			Object.keys(data.stats).forEach(key => {
				chartData.push({
					x: key,
					y: data['stats'][key][metric],
				});
			});

			setChartData([
				{
					id: 'dashboard-data',
					data: chartData,
				},
			]);
		}
	}, [metric, data]);

	const getTitleColor = metric => {
		if (data[metric] >= 0) {
			return 'rgb(23, 126, 86)';
		} else {
			return 'rgb(144, 64, 64)';
		}
	};

	return (
		<div>
			<PageHeader
				title="Cumulative P&L"
				style={{ paddingLeft: '0px' }}
				extra={[
					<Select
						defaultValue="return"
						onChange={value => setMetric(value)}
						style={{ marginBottom: '16px', width: 120 }}
					>
						<Option value="return">Return</Option>
						<Option value="netReturn">Net Return</Option>
					</Select>,
				]}
			/>

			{chartData && (
				<Card
					title={
						<h2
							style={{
								margin: 0,
								padding: 0,
								color: getTitleColor(metric),
							}}
						>
							{metric === 'return'
								? `₹${data['return']}`
								: `₹${data['netReturn']}`}
						</h2>
					}
				>
					<div style={{ width: '100%', height: '300px' }}>
						<ResponsiveLine
							data={chartData}
							colors="#1890ff"
							margin={{
								top: 16,
								left: 50,
								right: 16,
								bottom: 65,
							}}
							curve="natural"
							lineWidth={5}
							enableGridX={false}
							axisBottom={{
								orient: 'bottom',
								tickSize: 5,
								tickPadding: 5,
								tickRotation: -90,
								legendOffset: 36,
								legendPosition: 'middle',
							}}
							enablePoints={false}
							useMesh={true}
							yScale={{
								type: 'linear',
								min: 'auto',
								max: 'auto',
								stacked: true,
								reverse: false,
							}}
						/>
					</div>
				</Card>
			)}
		</div>
	);
};

export default DashboardView;
