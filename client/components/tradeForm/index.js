import { Row, Col, Button } from 'antd';
import React, { useState } from 'react';
import moment from 'moment';
import Date from './date';
import Type from './type';
import Buys from './buys';
import Sells from './sells';
import Stops from './stops';
import Targets from './targets';
import Commission from './commission';
import Setup from './setup';
import ReasonToEnter from './reasonToEnter';
import ReasonToExit from './reasonToExit';
import Notes from './notes';
import Screenshots from './screenshots';
import './index.scss';
import Symbol from './symbol';

const TradeForm = ({ handleSubmit, trade }) => {
	const [fields, setFields] = useState({
		date: trade ? moment(trade.date) : moment(),
		type: trade ? trade.type : 'SHORT',
		symbol: trade ? trade.symbol : '',
		buys: trade ? trade.buys : [{ price: '', quantity: '', time: '' }],
		sells: trade ? trade.sells : [{ price: '', quantity: '', time: '' }],
		stops: trade ? trade.stops : [],
		targets: trade ? trade.targets : [],
		commission: trade ? trade.commission : 0,
		setup: trade ? (trade.setup ? trade.setup._id : '') : '',
		reasonToEnter: trade ? trade.reasonToEnter : '',
		reasonToExit: trade ? trade.reasonToExit : '',
		notes: trade ? trade.notes : '',
		screenshots: trade ? trade.screenshots || [] : [],
	});

	const [saving, setSaving] = useState(false);

	const setField = (name, value) => {
		setFields({ ...fields, [name]: value });
	};

	const onSave = async () => {
		setSaving(true);
		if (!fields.setup) {
			delete fields['setup'];
		}
		await handleSubmit(fields);
		setSaving(false);
	};

	return (
		<Row gutter={32}>
			<Col span={12} className="form-fields">
				<Date setField={setField} value={fields.date} />
				<Type setField={setField} value={fields.type} />
				<Symbol setField={setField} value={fields.symbol} />
				<Buys setField={setField} value={fields.buys} />
				<Sells setField={setField} value={fields.sells} />
				<Stops setField={setField} value={fields.stops} />
				<Targets setField={setField} value={fields.targets} />
				<Commission setField={setField} value={fields.commission} />
			</Col>
			<Col span={12} className="form-fields">
				<Setup setField={setField} value={fields.setup} />
				<ReasonToEnter
					setField={setField}
					value={fields.reasonToEnter}
				/>
				<ReasonToExit setField={setField} value={fields.reasonToExit} />
				<Notes setField={setField} value={fields.notes} />
				<Screenshots setField={setField} value={fields.screenshots} />
				<Button
					type="primary"
					style={{ width: '100%' }}
					onClick={onSave}
					loading={saving}
				>
					Save
				</Button>
			</Col>
		</Row>
	);
};

export default TradeForm;
