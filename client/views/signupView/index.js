import React, { useState } from 'react';
import { Typography, Form, Alert, Button, Input, message } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import { create } from '../../api/users';

const { Title } = Typography;

const SignupView = () => {
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const history = useHistory();

	const layout = {
		labelCol: { span: 3 },
		wrapperCol: { span: 12 },
	};

	const tailLayout = {
		wrapperCol: { span: 12, offset: 3 },
	};

	const rules = name => {
		return {
			required: true,
			message: `Please input your ${name}!`,
		};
	};

	const onFinish = values => {
		setLoading(true);

		create(values)
			.then(() => {
				setLoading(false);
				message.config({
					top: 500,
					duration: 5,
				});
				message.success('Account created. Login to your account.');
				history.push('/login');
			})
			.catch(e => {
				setLoading(false);
				message.config({
					top: 500,
					duration: 5,
				});
				message.error(e.message);
			});
	};

	return (
		<div>
			<Title level={3}>Create Account</Title>
			<Form {...layout} onFinish={onFinish} style={{ marginTop: '16px' }}>
				<Form.Item
					label="Name"
					name="name"
					rules={[
						{
							required: true,
							message: 'Name is required.',
						},
					]}
				>
					<Input placeholder="Name" />
				</Form.Item>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							message: 'Email is required.',
						},
						{
							type: 'email',
							message: 'Enter a valid email address.',
						},
					]}
				>
					<Input placeholder="example@example.com" />
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: 'Password is required.',
						},
						{
							min: 6,
							message: 'Password should be of atleast 6 letters.',
						},
					]}
				>
					<Input.Password placeholder="Password" />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button htmlType="submit" type="primary" loading={loading}>
						Submit
					</Button>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Link to="/login">Already have an account? Login.</Link>
				</Form.Item>
				{alert && (
					<Form.Item {...tailLayout}>
						<Alert message={alert} type="error" showIcon closable />
					</Form.Item>
				)}
			</Form>
		</div>
	);
};

export default SignupView;
