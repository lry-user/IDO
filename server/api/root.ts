
import { userRouter } from "@/server/api/routers/user";
import { walletRouter } from "@/server/api/routers/wallet";
import { idoRouter } from "@/server/api/routers/ido";
import { ieoRouter } from "@/server/api/routers/ieo";
import { commonRouter } from "@/server/api/routers/common";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { financeRouter } from "@/server/api/routers/finance";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  wallet: walletRouter,
  ido: idoRouter,
  ieo: ieoRouter,
  common: commonRouter,
  finance: financeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
