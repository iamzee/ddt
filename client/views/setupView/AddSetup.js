import { Button } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import SetupForm from './SetupForm';

const AddSetup = ({ handleAddSetup }) => {
	const [visible, setVisible] = useState(false);

	const onClose = () => {
		setVisible(false);
	};

	const handleSubmit = async data => {
		try {
			await handleAddSetup(data);
		} catch (e) {}
	};

	return (
		<>
			<Button
				key="1"
				type="primary"
				icon={<PlusOutlined />}
				onClick={() => setVisible(true)}
			>
				Add Setup
			</Button>
			<SetupForm
				visible={visible}
				onClose={onClose}
				handleSubmit={handleSubmit}
			/>
		</>
	);
};

export default AddSetup;
