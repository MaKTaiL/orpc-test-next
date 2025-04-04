import {
  protectedProcedure,
  publicProcedure,
} from "@/server/orcp/utils/procedures";
import { z } from "zod";

const hello = publicProcedure
  .input(z.object({ text: z.string() }))
  .handler(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  })
  .callable();

const create = protectedProcedure
  .input(z.object({ name: z.string().min(1) }))
  .handler(async ({ context, input }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await context.db.post.create({
      data: {
        name: input.name,
        createdBy: { connect: { id: context.session.user.id } },
      },
    });
  })
  .callable();

const getLatest = protectedProcedure
  .handler(async ({ context }) => {
    const post = await context.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: context.session.user.id } },
    });
    return post ?? null;
  })
  .callable();

const getSecretMessage = protectedProcedure
  .handler(async () => {
    return "you can now see this secret message!";
  })
  .callable();

export const postRouter = {
  hello,
  create,
  getLatest,
  getSecretMessage,
};
