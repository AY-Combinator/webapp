import { NextRequest, NextResponse } from "next/server";
import { PrivyClient } from "@privy-io/server-auth";

const protectedRoutes = [
  "/dashboard",
  "/all-projects",
  "/leaderboard",
  "/profile",
  "/settings",
  "/module",
];

export async function middleware(req: NextRequest) {
  const authToken = req.cookies.get("privy-token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) => {
    return req.nextUrl.pathname.startsWith(route);
  });

  if (isProtectedRoute) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const client = new PrivyClient(
      process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
      process.env.PRIVY_APP_SECRET!
    );

    try {
      await client.verifyAuthToken(authToken);
      return NextResponse.next();
    } catch (error) {
      console.error("Auth verification failed:", error);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
