export { auth as middleware } from "@/server/auth"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico|css|js|woff|woff2)).*)"],
}