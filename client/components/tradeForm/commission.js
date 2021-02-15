import React, { useState, useEffect } from 'react';
import { InputNumber, Typography } from 'antd';

const { Text } = Typography;

const Commission = ({ setField, value }) => {
	const [commission, setCommission] = useState(value);

	const onChange = v => {
		setCommission(v);
	};

	useEffect(() => {
		setField('commission', commission);
	}, [commission]);

	return (
		<div>
			<Text strong style={{ marginBottom: '8px', display: 'block' }}>
				Commission
			</Text>
			<InputNumber
				placeholder="Commission"
				min={0}
				value={commission}
				onChange={onChange}
				style={{ width: '100%' }}
			/>
		</div>
	);
};

export default Commission;
