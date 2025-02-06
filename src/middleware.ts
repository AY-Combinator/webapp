import { NextRequest, NextResponse } from "next/server";
import { PrivyClient } from "@privy-io/server-auth";
import { cookies } from "next/headers";

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
  const existingUserId = req.cookies.get("userId")?.value;

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
      const { userId } = await client.verifyAuthToken(authToken);

      const cleanedUserId = userId.replace(/^did:privy:/, "");

      if (!existingUserId) {
        const response = NextResponse.next();
        response.cookies.set({
          name: "userId",
          value: cleanedUserId,
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });

        return response;
      }

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
