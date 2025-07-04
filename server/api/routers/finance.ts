import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { client } from "@/lib/ky";

export const financeRouter = createTRPCRouter({
  getFinanceInfo: protectedProcedure.query(async ({ ctx }) => {
    const response = await client.get("finance/products", {
      headers: {
        Authorization: `Bearer ${ctx.session.accessToken}`,
      },
    });
    return response.json<GlobalResponse<FinanceProductResponse>>();
  }),
  createOrder: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        product_id: z.union([z.string(), z.number()]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const response = await client.post("finance/orders", {
        headers: {
          Authorization: `Bearer ${ctx.session.accessToken}`,
        },
        json: input,
      });
      return response.json<GlobalResponse<null>>();
    }),
  //个人收益统计
  getPersonalEarnings: protectedProcedure.query(async ({ ctx }) => {
    const response = await client.get("finance/earnings/personal_stats", {
      headers: {
        Authorization: `Bearer ${ctx.session.accessToken}`,
      },
    });
    return response.json<GlobalResponse<PersonalEarningsResponse>>();
  }),
  //收益图谱
  getEarningsGraph: protectedProcedure.query(async ({ ctx }) => {
    const response = await client.get("finance/earnings/total_stats", {
      headers: {
        Authorization: `Bearer ${ctx.session.accessToken}`,
      },
    });
    return response.json<
      GlobalResponse<{
        /**
         * 销毁总收益
         */
        burn_reward_earned?: string;
        /**
         * 直推销毁总收益
         */
        direct_burn_reward_earned?: string;
        /**
         * 质押总收益
         */
        stake_reward_earned?: string;
        /**
         * 团队销毁总收益
         */
        team_burn_reward_earned?: string;
        /**
         * 总收益
         */
        total_earned?: string;
        percent:number
      }>
    >();
  }),
  // 领取收益
  claimRewards: protectedProcedure
    .input(
      z.object({
        earning_type: z.enum(["stake", "team", "direct", "burn"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      const response = await client.post("finance/earnings/claim", {
        headers: {
          Authorization: `Bearer ${ctx.session.accessToken}`,
        },
        json: {
          earning_type: input.earning_type,
        },
      });
      return response.json<GlobalResponse<null>>();
    }),
  // 获取团队收益统计
  getTeamEarnings: protectedProcedure.query(async ({ ctx }) => {
    const response = await client.get("finance/earnings/team_stats", {
      headers: {
        Authorization: `Bearer ${ctx.session.accessToken}`,
      },
    });
    return response.json<GlobalResponse<TeamEarningsResponse>>();
  }),
  // 获取个人收益记录
  getPersonalEarningsRecords: protectedProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        page: z.number().optional(),
        end_date: z.string().optional(),
        start_date: z.string().optional(),
        earning_type: z.enum(["stake", "burn"]).optional(),
        status: z.enum(["pending", "success"]).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const response = await client.get("finance/earnings/records", {
        headers: {
          Authorization: `Bearer ${ctx.session.accessToken}`,
        },
        searchParams: input,
      });
      return response.json<GlobalResponse<PersonalEarningsRecordResponse>>();
  }),
  // 获取团队收益记录
  getTeamEarningsRecords: protectedProcedure
    .input(z.object({
      limit: z.number().optional(),
      page: z.number().optional(),
      status: z.enum(["pending", "success"]).optional(),
    }))
    .query(async ({ ctx, input }) => {
      const response = await client.get("finance/earnings/team_records", {
        headers: {
          Authorization: `Bearer ${ctx.session.accessToken}`,
        },
        searchParams: input,
      });
      return response.json<GlobalResponse<TeamEarningsRecordResponse>>();
    }),
  // 获取个人销毁直推收益记录
  getPersonalBurnRecords: protectedProcedure
  .input(z.object({
    limit: z.number().optional(),
    page: z.number().optional(),
    status: z.enum(["pending", "success"]).optional(),
  }))
  .query(async ({ ctx, input }) => {
    const response = await client.get("finance/earnings/direct_records", {
      headers: {
        Authorization: `Bearer ${ctx.session.accessToken}`,
      },
      searchParams: input,
    });
    return response.json<GlobalResponse<PersonalBurnRecordResponse>>();
  }),
  // 获取质押/销毁订单
  getStakeBurnOrders: protectedProcedure
    .input(z.object({
      limit: z.number().optional(),
      page: z.number().optional(),
      product_type: z.enum(["STAKE", "BURN"]).optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    const response = await client.get("finance/orders", {
      headers: {
        Authorization: `Bearer ${ctx.session.accessToken}`,
      },
      searchParams: input,
    });
    return response.json<GlobalResponse<StakeBurnOrderResponse>>();
  }),
  // 获取团队树形结构
  getTeamTree: protectedProcedure.query(async ({ ctx }) => {
    const response = await client.get("finance/team/tree", {
      headers: {
        Authorization: `Bearer ${ctx.session.accessToken}`,
      },
    });
    return response.json<GlobalResponse<TeamTreeResponse>>();
  }),
});
