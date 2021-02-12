import React from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { remove } from '../../api/trade';

const { confirm } = Modal;

const DeleteTrade = ({ tradeId }) => {
	const showConfirm = () => {
		confirm({
			title: 'Are you sure you want to delete the trade?',
			icon: <ExclamationCircleOutlined />,
			onOk() {
				return new Promise(async (resolve, reject) => {
					try {
						await remove(tradeId);
						resolve();
					} catch (e) {
						reject();
					}
				});
			},
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onCancel() {
				console.log('CANCEL');
			},
		});
	};

	return (
		<Button
			key="delete"
			danger
			icon={<DeleteOutlined />}
			onClick={showConfirm}
		>
			Delete
		</Button>
	);
};

export default DeleteTrade;
