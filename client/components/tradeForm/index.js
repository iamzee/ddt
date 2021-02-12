import React, { useState, useEffect } from 'react';
import moment from 'moment';

import {
	Button,
	DatePicker,
	Input,
	Form,
	InputNumber,
	Select,
	Space,
	TimePicker,
	Row,
	Col,
	Spin,
} from 'antd';
import {
	MinusCircleOutlined,
	PlusOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons';
import { list } from '../../api/setup';

const { Option } = Select;
const { TextArea } = Input;

const TradeForm = ({ handleSubmit, trade }) => {
	const [loading, setLoading] = useState();
	const [setupList, setSetupList] = useState(null);

	const fetchSetupList = async () => {
		const setups = await list();
		setSetupList(setups);
	};

	useEffect(() => {
		fetchSetupList();
	}, []);

	const requiredRules = name => {
		return [
			{
				required: true,
				message: `${name} is required!`,
			},
		];
	};

	const onFinish = async values => {
		setLoading(true);

		if (!values['setup']) {
			delete values['setup'];
		}
		await handleSubmit(values);
		setLoading(false);
	};

	console.log('SETUPLIST', setupList);

	return (
		<Form layout="vertical" onFinish={onFinish}>
			<Row gutter={24}>
				<Col span={12}>
					{/* DATE ######################################################33 */}
					<Form.Item
						label="Date"
						name="date"
						initialValue={trade ? moment(trade.date) : moment()}
						rules={requiredRules('Date')}
					>
						<DatePicker
							allowClear={false}
							disabledDate={current =>
								current > moment().endOf('day')
							}
						/>
					</Form.Item>

					{/* TYPE ################################################ */}
					<Form.Item
						label="Type"
						name="type"
						rules={requiredRules('Trandaction Type')}
						initialValue={trade ? trade.type : 'LONG'}
					>
						<Select placeholder="Type">
							<Option value="LONG">LONG</Option>
							<Option value="SHORT">SHORT</Option>
						</Select>
					</Form.Item>

					{/* SYMBOL #################################################3 */}
					<Form.Item
						label="Symbol"
						name="symbol"
						rules={requiredRules('Symbol')}
						initialValue={trade ? trade.symbol : ''}
					>
						<Input placeholder="Ex: HDFC, LT, RELIANCE" />
					</Form.Item>

					{/* BUYS ###################################################### */}
					<Form.List
						name="buys"
						rules={[
							{
								validator: async (_, buy) => {
									if (!buy || buy.length === 0) {
										return Promise.reject(
											new Error('Buy is required!')
										);
									}
								},
							},
						]}
						initialValue={
							trade
								? trade.buys.map(b => ({
										...b,
										time: moment(b.time),
								  }))
								: []
						}
					>
						{(fields, { add, remove }, { errors }) => (
							<Form.Item label="Buys">
								{fields.map((field, index) => (
									<Space
										key={index}
										style={{
											display: 'flex',
											marginBottom: 8,
										}}
										align="baseline"
									>
										<Form.Item
											name={[field.name, 'price']}
											rules={requiredRules('Price')}
										>
											<InputNumber
												placeholder="Price"
												min={0}
											/>
										</Form.Item>
										<Form.Item
											name={[field.name, 'quantity']}
											rules={requiredRules('Quantity')}
										>
											<InputNumber placeholder="Quantity" />
										</Form.Item>
										<Form.Item
											name={[field.name, 'time']}
											rules={requiredRules('Time')}
										>
											<TimePicker
												allowClear={false}
												// disabledHours={() =>
												// 	disabledHours
												// }
												// disabledMinutes={
												// 	disabledMinutes
												// }
											/>
										</Form.Item>
										{fields.length > 1 ? (
											<MinusCircleOutlined
												onClick={() =>
													remove(field.name)
												}
											/>
										) : null}
									</Space>
								))}
								<Form.ErrorList errors={errors} />
								<Form.Item>
									<Button
										type="dashed"
										onClick={() => add()}
										icon={<PlusOutlined />}
									>
										Add Buy
									</Button>
								</Form.Item>
							</Form.Item>
						)}
					</Form.List>

					{/* SELLS ############################################ */}
					<Form.List
						name="sells"
						initialValue={
							trade
								? trade.sells.map(s => ({
										...s,
										time: moment(s.time),
								  }))
								: []
						}
					>
						{(fields, { add, remove }) => (
							<Form.Item label="Sells">
								{fields.map((field, index) => (
									<Space
										key={index}
										style={{
											display: 'flex',
											marginBottom: 8,
										}}
										align="baseline"
									>
										<Form.Item
											name={[field.name, 'price']}
											rules={requiredRules('Price')}
										>
											<InputNumber
												placeholder="price"
												min={0}
											/>
										</Form.Item>
										<Form.Item
											rules={requiredRules('Quantity')}
											name={[field.name, 'quantity']}
										>
											<InputNumber placeholder="Quantity" />
										</Form.Item>
										<Form.Item
											rules={requiredRules('Time')}
											name={[field.name, 'time']}
										>
											<TimePicker />
										</Form.Item>
										{fields.length > 1 ? (
											<MinusCircleOutlined
												onClick={() =>
													remove(field.name)
												}
											/>
										) : null}
									</Space>
								))}
								<Form.Item>
									<Button
										type="dashed"
										onClick={() => add()}
										icon={<PlusOutlined />}
									>
										Add Sell
									</Button>
								</Form.Item>
							</Form.Item>
						)}
					</Form.List>

					{/* STOPS ##############################################3 */}
					<Form.List
						name="stops"
						initialValue={trade ? trade.stops : []}
					>
						{(fields, { add, remove }) => (
							<Form.Item label="Stops">
								{fields.map((field, index) => (
									<Space
										key={index}
										style={{
											display: 'flex',
											marginBottom: 8,
										}}
										align="baseline"
									>
										<Form.Item
											name={[field.name, 'price']}
											rules={requiredRules('Price')}
										>
											<InputNumber
												placeholder="Price"
												min={0}
											/>
										</Form.Item>
										<Form.Item
											name={[field.name, 'reason']}
											initialValue=""
										>
											<Input
												style={{
													width: '100%',
												}}
												placeholder="Reason. Ex: Above VWAP"
											/>
										</Form.Item>
										<MinusCircleOutlined
											onClick={() => remove(field.name)}
										/>
									</Space>
								))}
								<Form.Item>
									<Button
										type="dashed"
										onClick={() => add()}
										icon={<PlusOutlined />}
									>
										Add Stop
									</Button>
								</Form.Item>
							</Form.Item>
						)}
					</Form.List>

					{/* TARGETS ############################################## */}
					<Form.List
						name="targets"
						initialValue={trade ? trade.targets : []}
					>
						{(fields, { add, remove }) => (
							<Form.Item label="Targets">
								{fields.map((field, index) => (
									<Space
										key={index}
										style={{
											display: 'flex',
											marginBottom: 8,
										}}
										align="baseline"
									>
										<Form.Item
											name={[field.name, 'price']}
											rules={requiredRules('Price')}
										>
											<InputNumber
												placeholder="price"
												min={0}
											/>
										</Form.Item>
										<Form.Item
											name={[field.name, 'reason']}
											initialValue=""
										>
											<Input placeholder="Reason. Ex: 1%" />
										</Form.Item>
										<MinusCircleOutlined
											onClick={() => remove(field.name)}
										/>
									</Space>
								))}
								<Form.Item>
									<Button
										type="dashed"
										onClick={() => add()}
										icon={<PlusOutlined />}
									>
										Add Target
									</Button>
								</Form.Item>
							</Form.Item>
						)}
					</Form.List>

					{/* COMMISSION ########################################### */}
					<Form.Item
						label="Commission"
						name="commission"
						initialValue={trade ? trade.commission : 0}
						tooltip={{
							title:
								'Brokerage and taxes. You can calculate brokerage & taxes on respective broker website.',
							icon: <InfoCircleOutlined />,
						}}
					>
						<InputNumber
							min={0}
							placeholder="Commission"
							style={{ width: '100%' }}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					{/* SETUP ################################################ */}
					<Form.Item
						label="Setup"
						name="setup"
						initialValue={
							trade && trade.setup ? trade.setup.title : ''
						}
					>
						<Select placeholder="Setup">
							{setupList &&
								setupList.map(setup => {
									return (
										<Option
											key={setup._id}
											value={setup._id}
										>
											{setup.title}
										</Option>
									);
								})}
						</Select>
					</Form.Item>

					{/* REASON TO ENTER ##################################################3 */}
					<Form.Item
						label="Reason to enter the trade."
						name="reasonToEnter"
						initialValue={trade ? trade.reasonToEnter : ''}
					>
						<TextArea
							rows={5}
							placeholder="Ex: Crosses 50 EMA on 5min timeframe."
						/>
					</Form.Item>

					{/* REASON TO EXIT TRADE ##################################### */}
					<Form.Item
						label="Reason to exit the trade."
						name="reasonToExit"
						initialValue={trade ? trade.reasonToExit : ''}
					>
						<TextArea
							rows={5}
							placeholder="Ex: Target Achieved, Stop Loss Hit, etc"
						/>
					</Form.Item>

					{/* NOTES ############################################### */}
					<Form.Item
						label="Notes"
						name="notes"
						initialValue={trade ? trade.notes : ''}
					>
						<TextArea
							rows={5}
							placeholder="Ex: Should have holded the trade till 200 EMA."
						/>
					</Form.Item>

					{/* SUBMIT ####################################################3 */}
					<Form.Item>
						<Button
							style={{ width: '100%' }}
							type="primary"
							htmlType="submit"
							loading={loading}
						>
							Submit
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default TradeForm;
