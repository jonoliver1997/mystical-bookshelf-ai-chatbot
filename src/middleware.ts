import { NextRequest, NextResponse } from "next/server";
import { rateLimiter } from "./lib/rate-limiter";

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? "127.0.0.1";

  try {
    const { success } = await rateLimiter.limit(ip);

    if (!success)
      return new NextResponse(
        "You are writing messages too fast. Please slow down."
      );
    return NextResponse.next();
  } catch (error) {
    return new NextResponse("An error occurred while processing your request.");
  }
}

export const config = {
  matcher: "/api/message/:path*",
};
