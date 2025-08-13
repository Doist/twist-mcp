import type { TwistApi } from '../twist-api';
import type { Comment } from '../types';

type GetCommentsArgs = {
	readonly thread_id: number;
};

type GetCommentArgs = {
	readonly id: number;
};

type AddCommentArgs = {
	readonly thread_id: number;
	readonly content: string;
	readonly recipients?: readonly string[] | string;
};

type UpdateCommentArgs = {
	readonly id: number;
	readonly content: string;
};

type AddReactionToCommentArgs = {
	readonly id: number;
	readonly reaction: string;
};



export function getTools(api: TwistApi) {
	function getComments({ thread_id }: GetCommentsArgs): Promise<Comment[]> {
		console.log(`Fetching all comments for thread ID: ${thread_id}`);
		return api.getComments(thread_id);
	}

	function getComment({ id }: GetCommentArgs): Promise<Comment> {
		console.log(`Fetching comment with ID: ${id}`);
		return api.getComment(id);
	}

	function addComment({ thread_id, content, recipients }: AddCommentArgs): Promise<Comment> {
		console.log(`Adding new comment to thread ID: ${thread_id}`);
		return api.addComment(thread_id, content, recipients);
	}

	function updateComment({ id, content }: UpdateCommentArgs): Promise<Comment> {
		console.log(`Updating comment with ID: ${id}`);
		return api.updateComment(id, content);
	}

	function addReactionToComment({ id, reaction }: AddReactionToCommentArgs): Promise<void> {
		console.log(`Adding reaction '${reaction}' to comment ${id}`);
		return api.addReactionToComment(id, reaction);
	}



	return {
		getComments,
		getComment,
		addComment,
		updateComment,
		addReactionToComment,

	};
}
