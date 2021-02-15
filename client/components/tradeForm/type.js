import React, { useState } from 'react';
import { Select, Typography } from 'antd';

const { Option } = Select;
const { Text } = Typography;

const Type = ({ setField, value }) => {
	const [type, setType] = useState(value);

	return (
		<div>
			<Text strong style={{ marginBottom: '8px', display: 'block' }}>
				Type
			</Text>
			<Select
				placeholder="Type"
				style={{ width: '100%' }}
				value={type}
				onChange={t => {
					setType(t);
					setField('type', t);
				}}
			>
				<Option value="LONG">LONG</Option>
				<Option value="SHORT">SHORT</Option>
			</Select>
		</div>
	);
};

export default Type;
