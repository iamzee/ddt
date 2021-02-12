import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
	DashboardOutlined,
	SlidersOutlined,
	UserOutlined,
	CodeOutlined,
	PlusOutlined,
	FileSearchOutlined,
	CalendarOutlined,
	QuestionOutlined,
} from '@ant-design/icons';
import './index.scss';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const Container = ({ children }) => {
	const [collapsed, setCollapsed] = useState(true);
	const [title, setTitle] = useState('Diary of a Day Trader');
	const [selectedKey, setSelectedKey] = useState();
	const location = useLocation();

	const onCollapse = collapsed => {
		setCollapsed(collapsed);
	};

	useEffect(() => {
		if (collapsed) {
			setTitle('DDT');
		} else {
			setTitle('Diary of a Day Trader');
		}
	}, [collapsed]);

	useEffect(() => {
		if (location.pathname === '/trades') {
			setSelectedKey(['trades']);
		} else if (location.pathname === '/trades/add') {
			setSelectedKey(['addTrade']);
		} else if (location.pathname === '/setups') {
			setSelectedKey(['setup']);
		} else if (location.pathname === '/calendar') {
			setSelectedKey(['calendar']);
		} else if (location.pathname === '/dashboard') {
			setSelectedKey(['dashboard']);
		} else if (location.pathname === '/reports/weekday') {
			setSelectedKey(['report', 'weekday-report']);
		} else if (location.pathname === '/reports/setup') {
			setSelectedKey(['report', 'setup-report']);
		} else if (location.pathname === '/reports/percentReport') {
			setSelectedKey(['report', 'percent-return-report']);
		} else if (location.pathname === '/reports/entryTime') {
			setSelectedKey(['report', 'entry-time-report']);
		} else if (location.pathname === '/reports/entryTime') {
			setSelectedKey(['report', 'entry-time-report']);
		} else if (location.pathname === '/reports/type') {
			setSelectedKey(['report', 'type-report']);
		} else if (location.pathname === '/reports/tradeDuration') {
			setSelectedKey(['report', 'trade-duration-report']);
		} else if (location.pathname === '/account') {
			setSelectedKey(['account']);
		}
	}, [location]);

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div className="title">
					<h3>{title}</h3>
				</div>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['dashboard']}
					selectedKeys={selectedKey}
				>
					<Menu.Item key="dashboard" icon={<DashboardOutlined />}>
						<Link to="/dashboard">Dashboard</Link>
					</Menu.Item>
					<Menu.Item key="trades" icon={<SlidersOutlined />}>
						<Link to="/trades">Trades</Link>
					</Menu.Item>
					<Menu.Item key="addTrade" icon={<PlusOutlined />}>
						<Link to="/trades/add">Add Trade</Link>
					</Menu.Item>
					<Menu.Item key="setup" icon={<CodeOutlined />}>
						<Link to="/setups">Setups</Link>
					</Menu.Item>
					<SubMenu
						key="report"
						title="Reports"
						icon={<FileSearchOutlined />}
					>
						<Menu.Item key="weekday-report">
							<Link to="/reports/weekday">Weekday</Link>
						</Menu.Item>
						<Menu.Item key="setup-report">
							<Link to="/reports/setup">Setup</Link>
						</Menu.Item>
						<Menu.Item key="entry-time-report">
							<Link to="/reports/entryTime">Entry Time</Link>
						</Menu.Item>
						<Menu.Item key="percent-return-report">
							<Link to="/reports/percentReturn">% Return</Link>
						</Menu.Item>
						<Menu.Item key="type-report">
							<Link to="/reports/type">Type</Link>
						</Menu.Item>
						<Menu.Item key="trade-duration-report">
							<Link to="/reports/tradeDuration">
								Trade Duration
							</Link>
						</Menu.Item>
					</SubMenu>
					<Menu.Item key="calendar" icon={<CalendarOutlined />}>
						<Link to="/calendar">Calendar</Link>
					</Menu.Item>
					<Menu.Item key="account" icon={<UserOutlined />}>
						<Link to="/account">Account</Link>
					</Menu.Item>
					<Menu.Item key="help" icon={<QuestionOutlined />}>
						Help
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout>
				<Content style={{ padding: '24px' }}>{children}</Content>
			</Layout>
		</Layout>
	);
};

export default Container;
