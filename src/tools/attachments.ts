import type { TwistApi } from '../twist-api';
import type { Attachment } from '../types';

type GetAttachmentArgs = {
	readonly id: string;
};

type UploadFileArgs = {
	readonly filePath: string;
};

/**
 * Factory function to create attachment-related tools.
 * @param api - The authenticated Twist API client.
 * @returns An object containing functions for interacting with attachments.
 */
export function getTools(api: TwistApi) {
	/**
	 * Retrieves the details of a single attachment.
	 * @param args - The arguments for getting an attachment.
	 * @param args.id - The ID of the attachment to retrieve.
	 * @returns A promise that resolves to the attachment object.
	 */
	function getAttachment({ id }: GetAttachmentArgs): Promise<Attachment> {
		console.log(`Fetching details for attachment with ID: ${id}...`);
		return api.getAttachment(id);
	}

	/**
	 * Uploads a file to Twist.
	 * @param args - The arguments for uploading a file.
	 * @param args.filePath - The local path to the file to upload.
	 * @returns A promise that resolves to the attachment object for the uploaded file.
	 */
	function uploadFile({ filePath }: UploadFileArgs): Promise<Attachment> {
		console.log(`Uploading file from path: ${filePath}...`);
		return api.uploadFile(filePath);
	}

	return {
		getAttachment,
		uploadFile,
	};
}
