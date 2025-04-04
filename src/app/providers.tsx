"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { ORPCContext } from "@/server/orcp/utils/context";
import { getQueryClient } from "@/server/orcp/utils/query-client";
import { createORPC } from "@/server/orcp/utils/client";

export default function Providers({
  children,
  cookie,
}: {
  children: React.ReactNode;
  cookie?: string;
}) {
  const queryClient = getQueryClient();
  const orpc = createORPC(cookie);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <ORPCContext.Provider value={orpc}>{children}</ORPCContext.Provider>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
