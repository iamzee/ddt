import React, { useState, useEffect } from 'react';
import { InputNumber, Typography, TimePicker, Button } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Buys = ({ setField, value }) => {
	console.log(value);
	const [buys, setBuys] = useState(value);

	const onPriceChange = i => v => {
		setBuys(
			buys.map((b, key) => {
				if (key === i) {
					return {
						...b,
						price: v,
					};
				} else {
					return b;
				}
			})
		);
	};

	const onQuantityChange = i => v => {
		setBuys(
			buys.map((b, key) => {
				if (key === i) {
					return {
						...b,
						quantity: v,
					};
				} else {
					return b;
				}
			})
		);
	};

	const onTimeChange = i => v => {
		setBuys(
			buys.map((b, key) => {
				if (key === i) {
					return {
						...b,
						time: v,
					};
				} else {
					return b;
				}
			})
		);
	};

	const addBuy = () => {
		setBuys([
			...buys,
			{
				price: '',
				quantity: '',
				time: '',
			},
		]);
	};

	const removeBuy = i => () => {
		setBuys(buys.filter((b, key) => key !== i));
	};

	useEffect(() => {
		setField('buys', buys);
	}, [buys]);

	return (
		<div>
			<Text strong style={{ marginBottom: '8px', display: 'block' }}>
				Buys
			</Text>
			{buys.map((b, i) => (
				<div className="buys-fields" key={i}>
					<InputNumber
						placeholder="Price"
						min={0}
						value={b.price}
						onChange={onPriceChange(i)}
					/>
					<InputNumber
						placeholder="Quantity"
						min={0}
						value={b.quantity}
						onChange={onQuantityChange(i)}
					/>
					<TimePicker
						allowClear={false}
						value={b.time}
						onChange={onTimeChange(i)}
					/>
					{i > 0 && (
						<MinusCircleOutlined
							className="buys-fields__remove-icon"
							onClick={removeBuy(i)}
						/>
					)}
				</div>
			))}
			<Button
				style={{ marginTop: '8px' }}
				onClick={addBuy}
				icon={<PlusOutlined />}
			>
				Add Buy
			</Button>
		</div>
	);
};

export default Buys;
