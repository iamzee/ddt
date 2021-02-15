import React, { useState, useEffect } from 'react';
import { Input, Typography } from 'antd';

const { TextArea } = Input;
const { Text } = Typography;

const ReasonToExit = ({ value, setField }) => {
	const [reasonToExit, setReasonToExit] = useState(value);

	useEffect(() => {
		setField('reasonToExit', reasonToExit);
	}, [reasonToExit]);

	return (
		<div>
			<Text strong style={{ marginBottom: '8px', display: 'block' }}>
				Reason to exit
			</Text>
			<TextArea
				rows={5}
				placeholder="Reason to exit."
				value={reasonToExit}
				onChange={e => setReasonToExit(e.target.value)}
			/>
		</div>
	);
};

export default ReasonToExit;
