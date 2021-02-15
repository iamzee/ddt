import React, { useEffect, useState } from 'react';
import { Typography, Select } from 'antd';
import { list } from '../../api/setup';

const { Text } = Typography;
const { Option } = Select;

const Setup = ({ value, setField }) => {
	const [setupList, setSetupList] = useState(null);
	const [setup, setSetup] = useState(value);

	const fetchSetupList = async () => {
		const setups = await list();
		setSetupList(setups);
	};

	useEffect(() => {
		fetchSetupList();
	}, []);

	useEffect(() => {
		setField('setup', setup);
	}, [setup]);

	return (
		<div>
			<Text strong style={{ marginBottom: '8px', display: 'block' }}>
				Setup
			</Text>
			<Select
				placeholder="Setup"
				style={{ width: '100%' }}
				allowClear
				value={setup}
				onChange={v => setSetup(v)}
			>
				{setupList &&
					setupList.map(setup => {
						return (
							<Option key={setup._id} value={setup._id}>
								{setup.title}
							</Option>
						);
					})}
			</Select>
		</div>
	);
};

export default Setup;
