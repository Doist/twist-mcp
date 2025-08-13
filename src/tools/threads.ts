import type { TwistApi } from '../twist-api';
import type { Thread } from '../types';

type GetThreadsArgs = {
	readonly channel_id: number;
};

type GetThreadArgs = {
	readonly id: number;
};

type AddThreadArgs = {
	readonly channel_id: number;
	readonly title: string;
	readonly content: string;
	readonly recipients?: readonly string[] | string;
};

type UpdateThreadArgs = {
	readonly id: number;
	readonly title?: string;
	readonly content?: string;
};

type StarThreadArgs = {
	readonly id: number;
};

type UnstarThreadArgs = {
	readonly id: number;
};

type PinThreadArgs = {
	readonly id: number;
};

type UnpinThreadArgs = {
	readonly id: number;
};

type MoveThreadArgs = {
	readonly id: number;
	readonly to_channel_id: number;
};

type MarkThreadAsReadArgs = {
	readonly id: number;
	readonly obj_index: number;
};

type MuteThreadArgs = {
	readonly id: number;
	readonly minutes: number;
};

type UnmuteThreadArgs = {
	readonly id: number;
};

export function getTools(api: TwistApi) {
	function getThreads({ channel_id }: GetThreadsArgs): Promise<Thread[]> {
		console.log(`Fetching all threads for channel ID: ${channel_id}`);
		return api.getThreads(channel_id);
	}

	function getThread({ id }: GetThreadArgs): Promise<Thread> {
		console.log(`Fetching thread with ID: ${id}`);
		return api.getThread(id);
	}

	function addThread({ channel_id, title, content, recipients }: AddThreadArgs): Promise<Thread> {
		console.log(`Adding new thread "${title}" to channel ID: ${channel_id}`);
		return api.addThread(channel_id, title, content, recipients);
	}

	function updateThread({ id, title, content }: UpdateThreadArgs): Promise<Thread> {
		console.log(`Updating thread with ID: ${id}`);
		return api.updateThread(id, title, content);
	}

	function starThread({ id }: StarThreadArgs): Promise<void> {
		console.log(`Starring thread with ID: ${id}`);
		return api.starThread(id);
	}

	function unstarThread({ id }: UnstarThreadArgs): Promise<void> {
		console.log(`Unstarring thread with ID: ${id}`);
		return api.unstarThread(id);
	}

	function pinThread({ id }: PinThreadArgs): Promise<void> {
		console.log(`Pinning thread with ID: ${id}`);
		return api.pinThread(id);
	}

	function unpinThread({ id }: UnpinThreadArgs): Promise<void> {
		console.log(`Unpinning thread with ID: ${id}`);
		return api.unpinThread(id);
	}

	function moveThread({ id, to_channel_id }: MoveThreadArgs): Promise<void> {
		console.log(`Moving thread ${id} to channel ${to_channel_id}`);
		return api.moveThread(id, to_channel_id);
	}

	function markThreadAsRead({ id, obj_index }: MarkThreadAsReadArgs): Promise<void> {
		console.log(`Marking thread ${id} as read up to index ${obj_index}`);
		return api.markThreadAsRead(id, obj_index);
	}

	function muteThread({ id, minutes }: MuteThreadArgs): Promise<Thread> {
		console.log(`Muting thread ${id} for ${minutes} minutes`);
		return api.muteThread(id, minutes);
	}

	function unmuteThread({ id }: UnmuteThreadArgs): Promise<Thread> {
		console.log(`Unmuting thread with ID: ${id}`);
		return api.unmuteThread(id);
	}

	return {
		getThreads,
		getThread,
		addThread,
		updateThread,
		starThread,
		unstarThread,
		pinThread,
		unpinThread,
		moveThread,
		markThreadAsRead,
		muteThread,
		unmuteThread,
	};
}
