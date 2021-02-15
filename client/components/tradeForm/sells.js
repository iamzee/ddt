import React, { useState, useEffect } from 'react';
import { InputNumber, Typography, TimePicker, Button } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Sells = ({ setField, value }) => {
	const [sells, setSells] = useState(value);

	const onPriceChange = i => v => {
		setSells(
			sells.map((s, key) => {
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

	const onQuantityChange = i => v => {
		setSells(
			sells.map((s, key) => {
				if (key === i) {
					return {
						...s,
						quantity: v,
					};
				} else {
					return s;
				}
			})
		);
	};

	const onTimeChange = i => v => {
		setSells(
			sells.map((s, key) => {
				if (key === i) {
					return {
						...s,
						time: v,
					};
				} else {
					return s;
				}
			})
		);
	};

	const addSell = () => {
		setSells([
			...sells,
			{
				price: '',
				quantity: '',
				time: '',
			},
		]);
	};

	const removeSell = i => () => {
		setSells(sells.filter((s, key) => key !== i));
	};

	useEffect(() => {
		setField('sells', sells);
	}, [sells]);

	return (
		<div>
			<Text strong style={{ marginBottom: '8px', display: 'block' }}>
				Sells
			</Text>
			{sells.map((s, i) => (
				<div className="buys-fields" key={i}>
					<InputNumber
						placeholder="Price"
						min={0}
						value={s.price}
						onChange={onPriceChange(i)}
					/>
					<InputNumber
						placeholder="Quantity"
						min={0}
						value={s.quantity}
						onChange={onQuantityChange(i)}
					/>
					<TimePicker
						allowClear={false}
						value={s.time}
						onChange={onTimeChange(i)}
					/>
					{i > 0 && (
						<MinusCircleOutlined
							className="buys-fields__remove-icon"
							onClick={removeSell(i)}
						/>
					)}
				</div>
			))}
			<Button
				style={{ marginTop: '8px' }}
				onClick={addSell}
				icon={<PlusOutlined />}
			>
				Add Sell
			</Button>
		</div>
	);
};

export default Sells;
