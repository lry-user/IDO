import ky from "ky";
import { getLocale } from "next-intl/server";
import "server-only";

// Custom error class for authentication errors
export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export const client = ky.create({
  prefixUrl: process.env.SERVER_ENDPOINT + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
  hooks: {
    beforeRequest: [
      async (request) => {
        // 服务端从 next-intl 获取语言
        try {
          const locale = await getLocale();
          request.headers.set("Lang", locale);
        } catch (error) {
          console.error("Failed to get locale:", error);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        // 处理 401 状态码
        if (response.status === 401 || response.status === 403) {
          throw new AuthError("token expired");
        }

        if (response.status === 200) {
          const json = await response.json<GlobalResponse<unknown>>();
          // Check if the API response indicates an authentication issue
          if (json.code === 401 || json.code === 403) {
            throw new AuthError(json.message || "Authentication failed");
          }
          if (json.code !== 200) {
            throw new Error(json.message || "Request failed");
          }
        }
      },
    ],
  },
});

// 创建不带 /api 前缀的客户端
export const clientWithoutApiPrefix = ky.create({
  prefixUrl: process.env.IDO_SERVER_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
  hooks: {
    beforeRequest: [
      async (request) => {
        // 服务端从 next-intl 获取语言
        try {
          const locale = await getLocale();
          request.headers.set("Lang", locale);
        } catch (error) {
          console.error("Failed to get locale:", error);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {

        if (response.status === 200) {
          const json = await response.json<GlobalResponse<unknown>>();
          // Check if the API response indicates an authentication issue
          if (json.code === 301) {
            throw new AuthError(json.msg || "Authentication failed");
          }
          if (json.code !== 200) {
            throw new Error(json.msg || "Request failed");
          }
        }
      },
    ],
  },
});
