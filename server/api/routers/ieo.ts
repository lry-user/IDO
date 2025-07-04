import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

import { client } from "@/lib/ky";

export const ieoRouter = createTRPCRouter({
  getIEOInfo: publicProcedure.input(z.object({
    token: z.string().optional(),
  })).query(async ({ input }) => {
    const response = await client.get("ieo/info", {
      headers: {
        Authorization: input.token ? `Bearer ${input.token}` : undefined,
      },
    });
    return response.json<GlobalResponse<IEOInfoResponse>>();
  }),
  createOrder: protectedProcedure.input(z.object({
    amount: z.number(),
    ieo_id: z.union([z.string(), z.number()]),
  })).mutation(async ({ ctx, input }) => {
    const response = await client.post("ieo/orders", {
      headers: {
        Authorization: `Bearer ${ctx.session.accessToken}`,
      },
      json: input,
    });
    return response.json<GlobalResponse<null>>();
  }),
});
