import type { TwistApi } from '../twist-api';
import type { Channel } from '../types';

type GetChannelsArgs = {
	readonly workspace_id: number;
};



type GetChannelArgs = {
	readonly id: number;
};





type ArchiveChannelArgs = {
	readonly id: number;
};

type UnarchiveChannelArgs = {
	readonly id: number;
};





export function getTools(api: TwistApi) {
	function getChannels({ workspace_id }: GetChannelsArgs): Promise<Channel[]> {
		console.log(`Fetching all channels for workspace ID: ${workspace_id}`);
		return api.getChannels(workspace_id);
	}

	function getChannel({ id }: GetChannelArgs): Promise<Channel> {
		console.log(`Fetching channel with ID: ${id}`);
		return api.getChannel(id);
	}



	function archiveChannel({ id }: ArchiveChannelArgs): Promise<void> {
		console.log(`Archiving channel with ID: ${id}`);
		return api.archiveChannel(id);
	}

	function unarchiveChannel({ id }: UnarchiveChannelArgs): Promise<void> {
		console.log(`Unarchiving channel with ID: ${id}`);
		return api.unarchiveChannel(id);
	}





	return {
		getChannels,
		getChannel,
		archiveChannel,
		unarchiveChannel,
	};
}
