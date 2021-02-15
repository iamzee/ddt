import React, { useState, useEffect } from 'react';
import { InputNumber, Typography, Button, Input } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Stops = ({ setField, value }) => {
	const [stops, setStops] = useState(value);

	const onPriceChange = i => v => {
		setStops(
			stops.map((s, key) => {
				if (key === i) {
					return {
						...s,
						price: v,
					};
				} else {
					return s;
				}
			})
		);
	};

	const onReasonChange = i => e => {
		setStops(
			stops.map((s, key) => {
				if (key === i) {
					return {
						...s,
						reason: e.target.value,
					};
				} else {
					return s;
				}
			})
		);
	};

	const addStop = () => {
		setStops([
			...stops,
			{
				price: '',
				reason: '',
			},
		]);
	};

	const removeStop = i => () => {
		setStops(stops.filter((s, key) => key !== i));
	};

	useEffect(() => {
		setField('stops', stops);
	}, [stops]);

	return (
		<div>
			<Text strong style={{ marginBottom: '8px', display: 'block' }}>
				Stops
			</Text>
			{stops.map((s, i) => (
				<div className="stops-fields" key={i}>
					<InputNumber
						placeholder="Price"
						min={0}
						value={s.price}
						onChange={onPriceChange(i)}
					/>
					<Input
						placeholder="Reason"
						value={s.reason}
						onChange={onReasonChange(i)}
					/>
					<MinusCircleOutlined
						className="stops-fields__remove-icon"
						onClick={removeStop(i)}
					/>
				</div>
			))}
			<Button
				style={{ marginTop: '8px' }}
				onClick={addStop}
				icon={<PlusOutlined />}
			>
				Add Stop
			</Button>
		</div>
	);
};

export default Stops;
