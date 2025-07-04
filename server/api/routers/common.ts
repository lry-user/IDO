import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

import { client } from "@/lib/ky";

export const commonRouter = createTRPCRouter({
  getAppConfig: publicProcedure.query(async () => {
    const response = await client.get("app/config");
    return response.json<GlobalResponse<AppConfigResponse>>();
  }),
  getCarousel: publicProcedure.query(async () => {
    const response = await client.get("app/carousel");
    return response.json<GlobalResponse<CarouselResponse>>();
  }),
});

