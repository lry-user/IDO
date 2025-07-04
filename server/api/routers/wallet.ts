import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { client } from "@/lib/ky";

export const walletRouter = createTRPCRouter({
  getWalletInfo: protectedProcedure.query(async ({ ctx }) => {
    const response = await client.get("wallet/info", {
      headers: {
        Authorization: `Bearer ${ctx.session.accessToken}`,
      },
    });
    return response.json<GlobalResponse<WalletInfoResponse>>();
  }),
  withdraw: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        coin_key: z.string().optional(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const response = await client.post("wallet/withdrawal", {
        headers: {
          Authorization: `Bearer ${ctx.session.accessToken}`,
        },
        json: input,
      });
      return response.json<
        GlobalResponse<{
          withdrawal_code: string;
        }>
      >();
    }),
  getRecord: protectedProcedure
    .input(
      z.object({
        type: z.enum(["withdraw", "deposit", "hi_reward"]),
        limit: z.union([z.string(), z.number()]).optional(),
        page: z.union([z.string(), z.number()]).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      // Send the request with timeout handling
      const response = await client.get("wallet/transactions", {
        headers: {
          Authorization: `Bearer ${ctx.session.accessToken}`,
        },
        searchParams: input,
      });
      return response.json<GlobalResponse<RecordResponse>>();
    }),
});
