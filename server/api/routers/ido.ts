import { z } from "zod";
import { teamInfoType, buyRecodItemType, idoItemType } from "@/types/ido";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

import { client, clientWithoutApiPrefix } from "@/lib/ky";

export const idoRouter = createTRPCRouter({
  getIDOInfo: publicProcedure
    .input(
      z.object({
        token: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const response = await client.get("ido/info", {
        headers: {
          Authorization: input.token ? `Bearer ${input.token}` : undefined,
        },
      });
      return response.json<GlobalResponse<IDOInfoResponse>>();
    }),
  getIDOOrder: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        limit: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      console.log(
        ctx.session.accessToken,
        "ctx.session.accessToken-------------"
      );
      const response = await client.get("ido/orders", {
        headers: {
          Authorization: `Bearer ${ctx.session.accessToken}`,
        },
        searchParams: input,
      });
      console.log(response, "response-------------");
      return response.json<GlobalResponse<OrderResponse>>();
    }),
  createOrder: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        phase_id: z.union([z.string(), z.number()]),
        day_number: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const response = await client.post("ido/orders", {
        headers: {
          Authorization: `Bearer ${ctx.session.accessToken}`,
        },
        json: input,
      });
      return response.json<GlobalResponse<null>>();
    }),
  // 查询ido信息
  queryIDOInfo: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const params = {
        type: input,
      };
      try {
        const response = await clientWithoutApiPrefix.post(
          "server-hub/c/user/queryIdoInfo",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ctx.session.accessToken}`,
            },
            body: JSON.stringify(params),
          }
        );
        console.log(ctx.session.accessToken);
        if (!response.ok) {
          // 记录更详细的错误信息
          console.error(
            `Request failed with status ${response.status}:`,
            await response.text()
          );
          // throw new Error(`Request failed with status ${response.status}`);
        }
        type ResponseDataType = {
          code: number;
          data: idoItemType[];
        };
        const responseData: ResponseDataType = await response.json();
        if (responseData.code === 200) {
          return responseData.data;
        } else {
          console.error(
            `Request failed with code ${responseData.code}:`,
            responseData
          );
          // throw new Error(`Request failed with code ${responseData.code}`);
        }
      } catch (error) {
        // 处理请求过程中的错误
        console.error("Error in queryIDOInfo:", error);
        // throw error;
      }
    }),
  // 查询购买记录 /server-hub/c/user/queryMyBuyRecord
  queryMyBuyRecord: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const response = await clientWithoutApiPrefix.post(
        "server-hub/c/user/queryMyBuyRecord",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ctx.session.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        // 记录更详细的错误信息
        console.error(
          `Request failed with status ${response.status}:`,
          await response.text()
        );
        // throw new Error(`Request failed with status ${response.status}`);
      }

      type ResponseDataType = {
        code: number;
        data: buyRecodItemType[];
      };
      const responseData: ResponseDataType = await response.json();
      if (responseData.code === 200) {
        return responseData.data;
      } else {
        console.error(
          `Request failed with code ${responseData.code}:`,
          responseData
        );
        // throw new Error(`Request failed with code ${responseData.code}`);
      }
    } catch (error) {
      // 处理请求过程中的错误
      console.error("Error in queryMyBuyRecord:", error);
      // throw error;
    }
  }),
  // 查询战队数据 /server-hub/c/user/queryMyTeam
  queryMyTeam: protectedProcedure.query(async ({ ctx }) => {
    try {
      const response = await clientWithoutApiPrefix.post(
        "server-hub/c/user/queryMyTeam",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ctx.session.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        // 记录更详细的错误信息
        console.error(
          `Request failed with status ${response.status}:`,
          await response.text()
        );
        // throw new Error(`Request failed with status ${response.status}`);
      }
      type ResponseDataType = {
        code: number;
        data: teamInfoType;
      };
      const responseData: ResponseDataType = await response.json();
      if (responseData.code === 200) {
        return responseData.data;
      } else {
        console.error(
          `Request failed with code ${responseData.code}:`,
          responseData
        );
        // throw new Error(`Request failed with code ${responseData.code}`);
      }
    } catch (error) {
      // 处理请求过程中的错误
      console.error("Error in queryMyTeam:", error);
      // throw error;
    }
  }),
  // 购买节点
  buyNode: protectedProcedure
    .input(
      z.object({
        buyCount: z.number(),
        nodeId: z.string(),
        timestamp: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // params
      const params = {
        buyCount: input.buyCount,
        nodeId: input.nodeId,
        timestamp: input.timestamp,
      };
      console.log(params);
      const response = await clientWithoutApiPrefix.post(
        "server-hub/c/user/buynode",
        {
          headers: {
            Authorization: `Bearer ${ctx.session.accessToken}`,
          },
          body: JSON.stringify(params),
        }
      );
      type ResponseDataType = {
        code: number;
        data: string;
      };
      const responseData: ResponseDataType = await response.json();
      if (responseData.code === 200) {
        return responseData.data;
      } else {
        console.error(
          `Request failed with code ${responseData.code}:`,
          responseData
        );
        // throw new Error(`Request failed with code ${responseData.code}`);
      }
    }),
});
