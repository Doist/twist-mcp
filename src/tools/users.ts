import type { TwistApi } from '../twist-api';
import type { User } from '../types';

export function getTools(api: TwistApi) {
	function getCurrentUser(): Promise<User> {
		console.log('Fetching current user...');
		return api.getCurrentUser();
	}

	return {
		getCurrentUser,
	};
}
