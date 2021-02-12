import { PageHeader } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchPercentReturnReport } from '../../api/report';
import { Card, Select } from 'antd';
import { ResponsiveBar } from '@nivo/bar';

const { Option } = Select;

const PercentReturnReportView = () => {
	const [data, setData] = useState(null);
	const [metric, setMetric] = useState('return');
	const [chartData, setChartData] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchPercentReturnReport();
			setData(data);
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (data) {
			var chartData = [];
			Object.keys(data.intervals).forEach(key => {
				chartData.push({
					interval: key,
					trades: data.intervals[key].trades,
					result: data.intervals[key].result,
				});
			});
			setChartData(chartData);
		}
	}, [data]);

	console.log(chartData);

	return (
		<div>
			<PageHeader
				title="% Return"
				style={{ paddingLeft: '0px', paddingTop: '0px' }}
				extra={[
					<Select
						defaultValue="0.5"
						// onChange={value => setMetric(value)}
						style={{ marginBottom: '16px', width: 120 }}
					>
						<Option value="0.1">0.1</Option>
						<Option value="0.2">0.2</Option>
						<Option value="0.3">0.3</Option>
						<Option value="0.4">0.4</Option>
						<Option value="0.5">0.5</Option>
						<Option value="1">1</Option>
						<Option value="1.5">1.5</Option>
					</Select>,
				]}
			/>

			<Card>
				<div style={{ height: '400px' }}>
					{chartData && (
						<ResponsiveBar
							data={chartData}
							indexBy="interval"
							keys={['trades']}
							margin={{
								top: 16,
								right: 16,
								bottom: 40,
								left: 50,
							}}
							animate={true}
							colors={item => {
								if (item.data.result === 'WIN') {
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
							// axisBottom={{
							// 	tickRotation: -90,
							// }}
						/>
					)}
				</div>
			</Card>
		</div>
	);
};

export default PercentReturnReportView;
