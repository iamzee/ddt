import { BlobServiceClient } from '@azure/storage-blob';

const account = process.env.STORAGE_ACCOUNT;
const sas = process.env.STORAGE_SAS_TOKEN;
const container = 'screenshots';

const createBlobInContainer = async (containerClient, file) => {
	const blobClient = containerClient.getBlockBlobClient(file.name);
	const options = {
		blobHTTPHeaders: {
			blobContentType: file.type,
		},
	};

	await blobClient.uploadBrowserData(file, options);
};

export const uploadFileToBlob = async file => {
	if (!file) {
		throw new Error('No file selected.');
	}

	const blobServiceClient = new BlobServiceClient(
		`https://${account}.blob.core.windows.net${sas}`
	);
	const containerClient = blobServiceClient.getContainerClient(container);

	await createBlobInContainer(containerClient, file);
};

export const fetchBlobUrl = name => {
	return `https://${account}.blob.core.windows.net/${container}/${name}`;
};
