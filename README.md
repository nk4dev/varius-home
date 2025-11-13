## using MCP server

- GitMCP.io: vercel/next.js   
https://vercel.gitmcp.io/next.js

## GitHub OAuth (NextAuth) setup

To enable GitHub login via NextAuth, create a GitHub OAuth App and set environment variables locally.

1. Create an OAuth App on GitHub (Settings → Developer settings → OAuth Apps → New OAuth App)
	- **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
2. Copy `.env.example` to `.env.local` and fill in `GITHUB_ID`, `GITHUB_SECRET`, and `NEXTAUTH_SECRET`.
3. Optionally set `NEXT_PUBLIC_GITHUB_CLIENT_ID` to show the client-side GitHub button during development.
4. Start the app with your normal dev command (`pnpm dev` / `npm run dev` / `yarn dev`).

If login doesn't redirect back, check browser devtools network tab and the Next.js server logs for errors.