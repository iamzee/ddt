import { Timeline, Card } from 'antd';
import React from 'react';
import moment from 'moment';

const History = ({ trade }) => {
	return (
		<Card>
			<Timeline mode="left">
				{trade.timeline.map(t => (
					<Timeline.Item label={moment(t.time).format('HH:mm:ss')}>
						[{t.action}] | [₹{t.price}] | [{t.quantity}]
					</Timeline.Item>
				))}
			</Timeline>
		</Card>
	);
};

export default History;
