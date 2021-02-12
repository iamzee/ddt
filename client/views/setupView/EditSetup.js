import React, { useState } from 'react';
import { Button, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import SetupForm from './SetupForm';

const EditSetup = ({ setup, handleEditSetup }) => {
	const [visible, setVisible] = useState(false);

	const onClose = () => {
		setVisible(false);
	};

	const handleSubmit = async values => {
		await handleEditSetup(setup._id, values);
		message.success('Setup updated successfully.', 5);
	};

	return (
		<>
			<Button
				type="text"
				icon={<EditOutlined />}
				onClick={() => setVisible(true)}
			>
				Edit
			</Button>
			<SetupForm
				setup={setup}
				visible={visible}
				onClose={onClose}
				handleSubmit={handleSubmit}
			/>
		</>
	);
};

export default EditSetup;
