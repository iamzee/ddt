import React, { useState, useEffect } from 'react';
import { Typography, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetchBlobUrl, uploadFileToBlob } from '../../../azure/azure-storage';

const { Text } = Typography;

const uploadButton = (
	<div>
		<PlusOutlined />
		<div style={{ marginTop: 8 }}>Upload</div>
	</div>
);

const Screenshots = ({ value, setField }) => {
	const [screenshots, setScreenshots] = useState(
		value.map(v => {
			return {
				uid: v,
				status: 'done',
				name: v,
				url: fetchBlobUrl(v),
			};
		})
	);

	const [previewImage, setPreviewImage] = useState('');
	const [previewVisible, setPreviewVisible] = useState(false);

	const onChange = ({ fileList }) => {
		console.log('F', fileList);
		setScreenshots(fileList);
	};

	const onPreview = file => {
		if (!file.url) {
			file.url = fetchBlobUrl(file.name);
		}
		setPreviewImage(file.url);
		setPreviewVisible(true);
	};

	const customRequest = ({ file, onSuccess, onError, onProgress }) => {
		onProgress({ percent: 50 });
		uploadFileToBlob(file)
			.then(() => {
				onSuccess('ok');
			})
			.catch(e => {
				onError(e);
			});
	};

	useEffect(() => {
		setField(
			'screenshots',
			screenshots.map(s => s.name)
		);
	}, [screenshots]);

	return (
		<div>
			<Text strong style={{ marginBottom: '8px', display: 'block' }}>
				Screenshots
			</Text>
			<div className="upload-fields">
				<Upload
					listType="picture-card"
					accept="image/png, image/jpeg"
					onChange={onChange}
					fileList={screenshots}
					customRequest={customRequest}
					onPreview={onPreview}
				>
					{screenshots.length === 3 ? null : uploadButton}
				</Upload>
			</div>
			<Modal
				visible={previewVisible}
				centered
				footer={null}
				onCancel={() => setPreviewVisible(false)}
				className="preview__modal"
				width={1150}
				title="Screenshot"
			>
				<img src={previewImage} className="preview__image" />
			</Modal>
		</div>
	);
};

export default Screenshots;
