import { Button, PageHeader } from 'antd';
import React from 'react';
import { logout } from '../../api/auth';

const AccountView = () => {
	return (
		<div>
			<PageHeader
				title="Account"
				style={{ paddingLeft: 0, paddingTop: 0 }}
				extra={[<Button onClick={() => logout()}>Logout</Button>]}
			/>
		</div>
	);
};

export default AccountView;
