import { router } from "@/server/orcp";
import { RPCHandler, serve } from "@orpc/server/next";

const handler = new RPCHandler(router);

const server = serve(handler, {
  prefix: "/orpc",
});

export const GET = server.GET.bind(server);
export const POST = server.POST.bind(server);
export const PUT = server.PUT.bind(server);
export const PATCH = server.PATCH.bind(server);
export const DELETE = server.DELETE.bind(server);
