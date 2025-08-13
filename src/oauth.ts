import { AuthorizationCode, type ModuleOptions } from 'simple-oauth2';
import dotenv from 'dotenv';

dotenv.config();

if (
	!process.env.TWIST_CLIENT_ID ||
	!process.env.TWIST_CLIENT_SECRET ||
	!process.env.TWIST_REDIRECT_URI
) {
	throw new Error(
		'Missing required environment variables: TWIST_CLIENT_ID, TWIST_CLIENT_SECRET, or TWIST_REDIRECT_URI',
	);
}

const config: ModuleOptions = {
	client: {
		id: process.env.TWIST_CLIENT_ID,
		secret: process.env.TWIST_CLIENT_SECRET,
	},
	auth: {
		tokenHost: 'https://twist.com',
		tokenPath: '/oauth/access_token',
		authorizePath: '/oauth/authorize',
	},
	options: {
		authorizationMethod: 'body',
	},
};

export const client = new AuthorizationCode(config);

type GetAuthorizationUriArgs = {
	readonly state: string;
};

/**
 * Constructs the authorization URL to redirect the user to.
 * @param args - The arguments for getting the authorization URI.
 * @param args.state - A unique, securely generated random string to prevent CSRF attacks.
 * @returns The full URL for the Twist authorization page.
 */
export function getAuthorizationUri({ state }: GetAuthorizationUriArgs): string {
	const authorizationUri: string = client.authorizeURL({
		redirect_uri: process.env.TWIST_REDIRECT_URI as string,
		scope: 'all',
		state: state,
	});
	return authorizationUri;
}

type GetTokenArgs = {
	readonly code: string;
};

type GetTokenResult = {
	readonly token: string;
};

/**
 * Exchanges an authorization code for an access token.
 * @param args - The arguments for getting the token.
 * @param args.code - The authorization code received from the Twist callback.
 * @returns An object containing the access token.
 */
export async function getToken({ code }: GetTokenArgs): Promise<GetTokenResult> {
	const tokenParams = {
		code,
		redirect_uri: process.env.TWIST_REDIRECT_URI as string,
		scope: 'all',
	};

	const accessToken = await client.getToken(tokenParams);

	if (typeof accessToken.token.access_token !== 'string') {
		throw new Error('Failed to retrieve a valid access token.');
	}

	return {
		token: accessToken.token.access_token,
	};
}
