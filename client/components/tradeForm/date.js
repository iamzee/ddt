import { DatePicker, Typography } from 'antd';
import React, { useState } from 'react';
import moment from 'moment';

const { Text } = Typography;

const Date = ({ setField, value }) => {
	const [date, setDate] = useState(value);

	return (
		<div>
			<Text strong style={{ marginBottom: '8px', display: 'block' }}>
				Date
			</Text>
			<DatePicker
				value={date}
				onChange={d => {
					setDate(d);
					setField('date', d);
				}}
				allowClear={false}
			/>
		</div>
	);
};

export default Date;
