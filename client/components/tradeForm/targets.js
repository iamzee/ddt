import React, { useState, useEffect } from 'react';
import { InputNumber, Typography, Button, Input } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Targets = ({ setField, value }) => {
	const [targets, setTargets] = useState(value);

	const onPriceChange = i => v => {
		setTargets(
			targets.map((t, key) => {
				if (key === i) {
					return {
						...t,
						price: v,
					};
				} else {
					return t;
				}
			})
		);
	};

	const onReasonChange = i => e => {
		setTargets(
			targets.map((t, key) => {
				if (key === i) {
					return {
						...t,
						reason: e.target.value,
					};
				} else {
					return t;
				}
			})
		);
	};

	const add = () => {
		setTargets([
			...targets,
			{
				price: '',
				reason: '',
			},
		]);
	};

	const remove = i => () => {
		setTargets(targets.filter((t, key) => key !== i));
	};

	useEffect(() => {
		setField('targets', targets);
	}, [targets]);

	return (
		<div>
			<Text strong style={{ marginBottom: '8px', display: 'block' }}>
				Targets
			</Text>
			{targets.map((t, i) => (
				<div className="stops-fields" key={i}>
					<InputNumber
						placeholder="Price"
						min={0}
						value={t.price}
						onChange={onPriceChange(i)}
					/>
					<Input
						placeholder="Reason"
						value={t.reason}
						onChange={onReasonChange(i)}
					/>
					<MinusCircleOutlined
						className="stops-fields__remove-icon"
						onClick={remove(i)}
					/>
				</div>
			))}
			<Button
				style={{ marginTop: '8px' }}
				onClick={add}
				icon={<PlusOutlined />}
			>
				Add Target
			</Button>
		</div>
	);
};

export default Targets;
