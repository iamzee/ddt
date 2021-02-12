import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Typography, Form, Button, Input, message } from 'antd';
import { login } from '../../api/auth';

const { Title } = Typography;

const LoginView = () => {
	const onFinish = values => {
		setLoading(true);

		login(values)
			.then(data => {
				setLoading(false);
				history.push('/dashboard');
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

	const layout = {
		labelCol: { span: 3 },
		wrapperCol: { span: 12 },
	};

	const tailLayout = {
		wrapperCol: { span: 12, offset: 3 },
	};

	const [loading, setLoading] = useState(false);
	const history = useHistory();

	return (
		<div>
			<Title level={3}>Login</Title>
			<Form {...layout} onFinish={onFinish}>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{ required: true, message: 'Please input your email!' },
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
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password placeholder="Password" />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit" loading={loading}>
						Submit
					</Button>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Link to="/signup">
						Didn't have an account? Create account.
					</Link>
				</Form.Item>
			</Form>
		</div>
	);
};

export default LoginView;
