import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { HTTPError } from "ky";

const loginSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expires: z.string().transform((val) => parseInt(val)),
});

export class CustomError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        expires: { label: "expires", type: "number" },
        refreshToken: { label: "refreshToken", type: "string" },
        accessToken: { label: "accessToken", type: "string" },
      },
      async authorize(credentials) {
        try {
          const parsed = loginSchema.safeParse(credentials);

          console.log(parsed.error);
          if (!parsed.success) {
            throw new CustomError("params is not valid");
          }
          return {
            id: parsed.data.accessToken,
            accessToken: parsed.data.accessToken,
            refreshToken: parsed.data.refreshToken,
            expires: parsed.data.expires,
          };
        } catch (error) {
          if (error instanceof CustomError) {
            throw error;
          }
          if (error instanceof HTTPError) {
            throw new CustomError(error.response.statusText);
          }
          if (error instanceof Error) {
            throw new CustomError(error.message);
          }
          throw new CustomError("Unknown error");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expires = user.expires;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.error) {
        session.error = token.error as string;
      }

      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage = [
        "/login",
        "/register",
        "/reset-password",
      ].includes(nextUrl.pathname);

      if (isAuthPage) return true;

      return isLoggedIn;
    },
  },
  session: {
    maxAge: 60 * 60 * 20,
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
