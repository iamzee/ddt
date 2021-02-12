import React, { useState } from 'react';
import { Form, Input, Button, Drawer } from 'antd';

const { TextArea } = Input;

const SetupForm = ({ visible, onClose, handleSubmit, setup }) => {
	const [loading, setLoading] = useState(false);

	const onFinish = async values => {
		try {
			setLoading(true);
			await handleSubmit(values);
			setLoading(false);
			onClose();
		} catch (e) {}
	};

	return (
		<Drawer
			title="Add Setup"
			visible={visible}
			placement="right"
			closable={false}
			onClose={onClose}
			width={350}
		>
			<Form layout="vertical" onFinish={onFinish}>
				<Form.Item
					label="Title"
					name="title"
					rules={[
						{
							required: true,
							message: 'Title is required.',
						},
					]}
					initialValue={setup ? setup.title : ''}
				>
					<Input placeholder="Title" />
				</Form.Item>
				<Form.Item
					label="Description"
					name="description"
					initialValue={setup ? setup.description : ''}
				>
					<TextArea placeholder="Describe your setup." rows={5} />
				</Form.Item>
				<Form.Item>
					<Button onClick={onClose}>Cancel</Button>
					<Button type="primary" htmlType="submit" loading={loading}>
						Save
					</Button>
				</Form.Item>
			</Form>
		</Drawer>
	);
};

export default SetupForm;
