import { PageHeader } from 'antd';

import React, { useState, useEffect } from 'react';
import AddSetup from './AddSetup';
import { create, edit, list } from '../../api/setup';
import ListSetups from './ListSetups';

const SetupView = () => {
	const [setups, setSetups] = useState(null);

	useEffect(() => {
		try {
			const fetchData = async () => {
				const setups = await list();
				setSetups(setups);
			};
			fetchData();
		} catch (e) {}
	}, []);

	const handleAddSetup = async data => {
		try {
			const setup = await create(data);
			setSetups([setup, ...setups]);
		} catch (e) {}
	};

	const handleEditSetup = async (setupId, payload) => {
		try {
			const setup = await edit(setupId, payload);
			setSetups(
				setups.map(s => {
					if (s._id === setupId) {
						return setup;
					} else {
						return s;
					}
				})
			);
		} catch (e) {}
	};

	return (
		<div>
			<PageHeader
				title="Setups"
				extra={[<AddSetup handleAddSetup={handleAddSetup} />]}
			/>
			<ListSetups setups={setups} handleEditSetup={handleEditSetup} />
		</div>
	);
};

export default SetupView;
