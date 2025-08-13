import express, { type Request, type Response } from 'express';
import { randomBytes } from 'crypto';
import { getAuthorizationUri, getToken } from './oauth';
import { TwistApi } from './twist-api';
import { getTools } from './tools';

const app = express();
const port: number = 3000;

// NOTE: In a production application, you should use a robust session management
// solution (like express-session) to store the OAuth state.
// For this example, a simple in-memory variable is used.
let oauthState: string | null = null;

app.get('/authorize', (req: Request, res: Response): void => {
	console.log('Redirecting to Twist for authorization...');
	oauthState = randomBytes(16).toString('hex');
	const authorizationUri = getAuthorizationUri({ state: oauthState });
	res.redirect(authorizationUri);
});

app.get(
	'/callback',
	async (
		req: Request<object, object, object, { code?: string; state?: string }>,
		res: Response,
	): Promise<void> => {
		const { code, state } = req.query;

		if (!code) {
			res
				.status(400)
				.send('Authorization code is missing from the callback.');
			return;
		}

		if (!state || state !== oauthState) {
			res.status(400).send('Invalid state parameter. CSRF attack?');
			return;
		}

		// Reset the state after validation to prevent reuse
		oauthState = null;

		try {
			console.log('Exchanging authorization code for an access token...');
			const { token } = await getToken({ code });
			console.log('Access token successfully retrieved.');

			const api = new TwistApi(token);
			const tools = getTools(api);

			console.log('Fetching workspaces using the new access token...');
			const workspaces = await tools.getWorkspaces();

			res.json({
				message: 'Successfully authenticated and fetched data!',
				workspaces,
			});
		} catch (error) {
			console.error('Error during OAuth callback:', error);
			res.status(500).send('Failed to obtain access token or fetch data.');
		}
	},
);

app.listen(port, () => {
	console.log(`Twist MCP server running on http://localhost:${port}`);
	console.log(`To start the authentication process, open your browser and go to:`);
	console.log(`http://localhost:${port}/authorize`);
});
