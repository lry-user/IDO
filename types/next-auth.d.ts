import "next-auth"

// 扩展next-auth的类型
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    expires?: number;
    error?: string;
    user?: {
      email: string;
    };
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    expires: number;
    email: string;
  }

}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    expires: number;
  }
}
