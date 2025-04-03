import { router } from "@/server/orcp";
import { RPCHandler, serve } from "@orpc/server/next";

const handler = new RPCHandler(router);

const server = serve(handler, {
  prefix: "/rpc",
});

const GET = server.GET.bind(server);
const POST = server.POST.bind(server);
const PUT = server.PUT.bind(server);
const PATCH = server.PATCH.bind(server);
const DELETE = server.DELETE.bind(server);

export { GET, POST, PUT, PATCH, DELETE };
