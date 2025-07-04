import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { client } from "@/lib/ky";

export const userRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(6) }))
    .mutation(async ({ input }) => {
      const response = await client.post("users/login", {
        json: { email: input.email, password: input.password },
      });
      return response.json<GlobalResponse<null>>();
    }),
  register: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(6), code: z.string(),invite_code: z.string() }))
    .mutation(async ({ input }) => {
      const response = await client.post("users/register", {
        json: { email: input.email, password: input.password, code: input.code,invite_code: input.invite_code },
      });
      return response.json<GlobalResponse<null>>();
    }),
  resetPassword: publicProcedure
    .input(z.object({ email: z.string().email(), code: z.string(), password: z.string().min(6) }))
    .mutation(async ({ input }) => {
      const response = await client.post("users/reset-password", {
        json: { email: input.email, code: input.code, password: input.password },
      });
      return response.json<GlobalResponse<null>>();
    }),
  sendEmailCode: publicProcedure
    .input(z.object({ email: z.string().email(), type: z.enum(["reset_password","register","recover_payment_password"]) }))
    .mutation(async ({ input }) => {
      const response = await client.post("users/send-email-code", {
        json: { email: input.email, type: input.type },
      });
      return response.json<GlobalResponse<null>>();
    }),
  jcLogin: publicProcedure
    .input(z.object({ jc_code: z.string() }))
    .mutation(async ({ input }) => {
      const response = await client.post("users/jc-login", {
        json: { jc_code: input.jc_code },
      });
      return response.json<GlobalResponse<JcLoginResponse>>();
    }),
  jcRegister: publicProcedure
    .input(z.object({ 
      email: z.string().email(), 
      code: z.string(), 
      invite_code: z.string(),
      openid: z.string(),
      nickname: z.string()
    }))
    .mutation(async ({ input }) => {
      const response = await client.post("users/jc-register", {
        json: { 
          email: input.email, 
          code: input.code, 
          invite_code: input.invite_code,
          openid: input.openid,
          nickname: input.nickname
        },
      });
      return response.json<GlobalResponse<JcAuthResponse>>();
    }),
  jcBind: publicProcedure
    .input(z.object({ 
      email: z.string().email(), 
      password: z.string().min(6),
      openid: z.string(),
      nickname: z.string()
    }))
    .mutation(async ({ input }) => {
      const response = await client.post("users/jc-bind", {
        json: { 
          email: input.email, 
          password: input.password,
          openid: input.openid,
          nickname: input.nickname
        },
      });
      return response.json<GlobalResponse<JcAuthResponse>>();
    }),
  getUserInfo: protectedProcedure.query(async ({ ctx }) => {
    const response = await client.get("users/info", {
      headers: {
        Authorization: `Bearer ${ctx.session.accessToken}`,
      },
    });
    return response.json<GlobalResponse<UserInfoResponse>>();
  }),
  setPaymentPassword: protectedProcedure
    .input(z.object({ password: z.string().min(6).max(16),code: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const response = await client.post("users/verify-email-and-set-payment-password", {
        headers: {
          Authorization: `Bearer ${ctx.session.accessToken}`,
        },
        json: { password: input.password, code: input.code },
      });
      return response.json<GlobalResponse<null>>();
    }),
});
