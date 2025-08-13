import type { TwistApi } from '../twist-api';
import type { Channel, User, Workspace } from '../types';

type GetWorkspaceArgs = {
	readonly id: number;
};







type GetPublicChannelsArgs = {
	readonly id: number;
};

type GetWorkspaceUsersArgs = {
	readonly id: number;
};





export function getTools(api: TwistApi) {
	function getWorkspaces(): Promise<Workspace[]> {
		console.log('Fetching all workspaces...');
		return api.getWorkspaces();
	}

	function getWorkspace({ id }: GetWorkspaceArgs): Promise<Workspace> {
		console.log(`Fetching workspace with ID: ${id}`);
		return api.getWorkspace(id);
	}

	function getDefaultWorkspace(): Promise<Workspace> {
		console.log('Fetching the default workspace...');
		return api.getDefaultWorkspace();
	}







	function getPublicChannels({ id }: GetPublicChannelsArgs): Promise<Channel[]> {
		console.log(`Fetching public channels for workspace ID: ${id}`);
		return api.getPublicChannels(id);
	}

	function getWorkspaceUsers({ id }: GetWorkspaceUsersArgs): Promise<User[]> {
		console.log(`Fetching all users for workspace ID: ${id}`);
		return api.getWorkspaceUsers(id);
	}





	return {
		getWorkspaces,
		getWorkspace,
		getDefaultWorkspace,
		getPublicChannels,
		getWorkspaceUsers,
	};
}
