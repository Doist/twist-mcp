# Twist MCP

This project provides an MCP (Model Context Protocol) server for interacting with the Twist API. It uses a modular, type-safe architecture built with TypeScript and Node.js to expose various API functionalities as "tools". Authentication is handled via the Twist OAuth 2.0 flow.

## Prerequisites

Before you begin, ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (v18 or later)
-   [npm](https://www.npmjs.com/)

## Setup

Clone the repository and run the setup script:

```bash
git clone https://github.com/Doist/twist-mcp.git
cd twist-mcp
npm run setup
```

This will install all required packages and create a `.env` file from the template if it doesn't already exist.

## Configure Environment Variables

This server requires the following environment variables from a Twist application to authenticate via OAuth 2.0:

- `TWIST_CLIENT_ID` - Your application's Client ID
- `TWIST_CLIENT_SECRET` - Your application's Client Secret  
- `TWIST_REDIRECT_URI` - The redirect URI for OAuth callbacks

### Create a Twist App

-   Go to the [Twist App Directory](https://twist.com/apps/build).
-   Click "Create a new app".
-   Fill in the required details for your application.
-   In the "OAuth" section, you will find your **Client ID** and **Client Secret**.
-   You must also specify a **Redirect URI**. For local development, use `http://localhost:3000/callback`.

### Configure your credentials

Edit the `.env` file (created during setup) and replace the placeholder values with the credentials you obtained from the Twist App Directory.

**Important:** Never commit your `.env` file to version control.

## Usage

Once you have completed the setup, you can start the server.

### 1. Run the Server

Execute the following command to compile the TypeScript and start the Express server:

```bash
npm start
```

You should see the following output in your terminal, indicating that the server is running:

```
Twist MCP server running on http://localhost:3000
To start the authentication process, open your browser and go to:
http://localhost:3000/authorize
```

### 2. Authorize the Application

-   Open your web browser and navigate to `http://localhost:3000/authorize`.
-   You will be redirected to the Twist authorization page.
-   Log in to your Twist account if prompted.
-   Review the requested permissions and click "Allow" to authorize the application.

### 3. Receive the Access Token

-   After authorization, Twist will redirect you back to the `http://localhost:3000/callback` URL you configured.
-   The server will handle this callback, exchange the provided authorization code for an access token, and use that token to make an API call.

If successful, you will see a confirmation message in your browser and detailed logs in your terminal showing the token exchange and the results of the API call (e.g., fetching your workspaces).
