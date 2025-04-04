"use client";

import type { router } from "@/server/orcp";
import { ORPCContext } from "@/server/orcp/context";
import { getQueryClient } from "@/server/orcp/query-client";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createORPCReactQueryUtils } from "@orpc/react-query";
import type { RouterClient } from "@orpc/server";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

export default function Providers({
  children,
  baseUrl,
  cookie,
}: {
  children: React.ReactNode;
  baseUrl: string;
  cookie?: string;
}) {
  const queryClient = getQueryClient();

  const link = new RPCLink({
    url: baseUrl + "/rpc",
    headers: {
      Cookie: cookie,
    },
  });

  const client: RouterClient<typeof router> = createORPCClient(link);

  const orpc = createORPCReactQueryUtils(client);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <ORPCContext.Provider value={orpc}>{children}</ORPCContext.Provider>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
