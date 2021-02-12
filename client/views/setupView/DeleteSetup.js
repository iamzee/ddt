import React from 'react';

import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteSetup = () => {
	return (
		<>
			<Button icon={<DeleteOutlined />} type="text" danger>
				Delete
			</Button>
		</>
	);
};

export default DeleteSetup;
