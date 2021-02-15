import React, { useState, useEffect } from 'react';
import { Input, Typography } from 'antd';

const { TextArea } = Input;
const { Text } = Typography;

const ReasonToEnter = ({ value, setField }) => {
	const [reasonToEnter, setReasonToEnter] = useState(value);

	useEffect(() => {
		setField('reasonToEnter', reasonToEnter);
	}, [reasonToEnter]);

	return (
		<div>
			<Text strong style={{ marginBottom: '8px', display: 'block' }}>
				Reason to enter
			</Text>
			<TextArea
				rows={5}
				placeholder="Reason to enter."
				value={reasonToEnter}
				onChange={e => setReasonToEnter(e.target.value)}
			/>
		</div>
	);
};

export default ReasonToEnter;
