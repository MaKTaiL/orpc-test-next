import type { RouterClient } from "@orpc/server";
import { createORPCClient } from "@orpc/client";
import { createORPCReactQueryUtils } from "@orpc/react-query";
import { RPCLink } from "@orpc/client/fetch";
import type { router } from ".";

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

const link = new RPCLink({
  url: getBaseUrl() + "/rpc",
});

const client: RouterClient<typeof router> = createORPCClient(link);

export const orpc = createORPCReactQueryUtils(client);
