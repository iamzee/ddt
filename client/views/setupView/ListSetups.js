import { Card, Empty } from 'antd';
import React from 'react';
import EditSetup from './EditSetup';
import DeleteSetup from './DeleteSetup';

const ListSetups = ({ setups, handleEditSetup }) => {
	return (
		<div>
			{setups && setups.length > 0 ? (
				setups.map(setup => (
					<Card
						title={setup.title}
						key={setup._id}
						style={{ marginBottom: '24px' }}
						extra={
							<div>
								<EditSetup
									setup={setup}
									handleEditSetup={handleEditSetup}
								/>
								<DeleteSetup />
							</div>
						}
					>
						{setup.description}
					</Card>
				))
			) : (
				<Empty />
			)}
		</div>
	);
};

export default ListSetups;
