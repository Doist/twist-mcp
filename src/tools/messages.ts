import type { TwistApi } from '../twist-api';
import type { Message } from '../types';

type GetMessagesArgs = {
	readonly conversation_id: number;
};

type GetMessageArgs = {
	readonly id: number;
};

type AddMessageArgs = {
	readonly conversation_id: number;
	readonly content: string;
};

type UpdateMessageArgs = {
	readonly id: number;
	readonly content: string;
};



type AddReactionToMessageArgs = {
	readonly id: number;
	readonly reaction: string;
};



export function getTools(api: TwistApi) {
	function getMessages({ conversation_id }: GetMessagesArgs): Promise<Message[]> {
		console.log(`Fetching all messages for conversation ID: ${conversation_id}`);
		return api.getMessages(conversation_id);
	}

	function getMessage({ id }: GetMessageArgs): Promise<Message> {
		console.log(`Fetching message with ID: ${id}`);
		return api.getMessage(id);
	}

	function addMessage({ conversation_id, content }: AddMessageArgs): Promise<Message> {
		console.log(`Adding new message to conversation ID: ${conversation_id}`);
		return api.addMessage(conversation_id, content);
	}

	function updateMessage({ id, content }: UpdateMessageArgs): Promise<Message> {
		console.log(`Updating message with ID: ${id}`);
		return api.updateMessage(id, content);
	}



	function addReactionToMessage({ id, reaction }: AddReactionToMessageArgs): Promise<void> {
		console.log(`Adding reaction '${reaction}' to message ${id}`);
		return api.addReactionToMessage(id, reaction);
	}



	return {
		getMessages,
		getMessage,
		addMessage,
		updateMessage,

		addReactionToMessage,

	};
}
