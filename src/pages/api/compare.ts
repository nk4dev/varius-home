// Run on the Edge (Cloudflare/Open Next). The handler also supports Node-style Next API calls.
export const runtime = 'edge';

import type { NextApiRequest, NextApiResponse } from 'next';

async function fetchGitHubDiff(base: string, head: string) {
  const GITHUB_SECRET = process.env.GITHUB_SECRET;
  if (!GITHUB_SECRET) {
    throw new Error('GITHUB_SECRET not configured');
  }
  const url = `https://api.github.com/repos/nk4dev/vx3/compare/${encodeURIComponent(base)}...${encodeURIComponent(head)}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_SECRET}`,
      Accept: 'application/vnd.github.v3.diff'
    }
  });
  const text = await response.text();
  return { ok: response.ok, status: response.status, text };
}

export default async function handler(req: NextApiRequest | Request, res?: NextApiResponse) {
  // Edge (Request) path: res will be undefined
  const isEdge = typeof (req as any).url === 'string' && typeof res === 'undefined';

  try {
    let base: string | null = null;
    let head: string | null = null;

    if (isEdge) {
      const url = new URL((req as Request).url);
      base = url.searchParams.get('base');
      head = url.searchParams.get('head');
    } else {
      const q = (req as NextApiRequest).query;
      base = Array.isArray(q.base) ? q.base[0] : (q.base as string | undefined) ?? null;
      head = Array.isArray(q.head) ? q.head[0] : (q.head as string | undefined) ?? null;
    }

    if (!base || !head) {
      if (isEdge) return new Response(JSON.stringify({ error: 'base and head query params required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      return (res as NextApiResponse).status(400).json({ error: 'base and head query params required' });
    }

    const gh = await fetchGitHubDiff(base, head);
    if (isEdge) {
      return new Response(gh.text, { status: gh.status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }

    if (!gh.ok) {
      return (res as NextApiResponse).status(gh.status).send(gh.text);
    }
    (res as NextApiResponse).setHeader('Content-Type', 'text/plain; charset=utf-8');
    return (res as NextApiResponse).status(200).send(gh.text);

  } catch (err: any) {
    if (isEdge) return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    return (res as NextApiResponse).status(500).json({ error: String(err.message || err) });
  }
}
