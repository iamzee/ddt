import React, { useState, useEffect } from 'react';
import { Input, Typography } from 'antd';

const { TextArea } = Input;
const { Text } = Typography;

const Notes = ({ value, setField }) => {
	const [notes, setNotes] = useState(value);

	useEffect(() => {
		setField('notes', notes);
	}, [notes]);

	return (
		<div>
			<Text strong style={{ marginBottom: '8px', display: 'block' }}>
				Notes
			</Text>
			<TextArea
				rows={5}
				placeholder="Notes"
				value={notes}
				onChange={e => setNotes(e.target.value)}
			/>
		</div>
	);
};

export default Notes;
