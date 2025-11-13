import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../vx-api-server/src/trpc-router';

const API_URL =
  process.env.NEXT_PUBLIC_TRPC_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:3001';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${API_URL}/trpc`,
    }),
  ],
});
