import React, { useState } from 'react';
import { Input, Typography } from 'antd';

const { Text } = Typography;

const Symbol = ({ value, setField }) => {
	const [symbol, setSymbol] = useState(value);

	const onChange = e => {
		setSymbol(e.target.value.toUpperCase());
		setField('symbol', e.target.value.toUpperCase());
	};

	return (
		<div>
			<Text strong style={{ marginBottom: '8px', display: 'block' }}>
				Symbol
			</Text>
			<Input
				placeholder="Ex: HDFC, LT, RELIANCE"
				value={symbol}
				onChange={onChange}
			/>
		</div>
	);
};

export default Symbol;
