import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { ORPCError, os } from "@orpc/server";

export const publicProcedure = os.use(async ({ next }) => {
  const session = await auth();

  const result = await next({
    context: {
      session,
      db,
    },
  });

  return result;
});

export const protectedProcedure = publicProcedure.use(
  async ({ context, next }) => {
    const session = context.session;
    if (!session) {
      throw new ORPCError("UNAUTHORIZED", {
        message: "You must be logged in to access this resource.",
      });
    }

    const result = await next({
      context: {
        ...context,
        session: session,
      },
    });
    return result;
  },
);
