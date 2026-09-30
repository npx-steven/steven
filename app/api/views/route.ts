import { NextResponse, NextRequest } from "next/server";
import { redis } from "@/lib/redis";

const KEY = "site:views";
const COOKIE = "visited";
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function POST(request: NextRequest) {
  const seen = request.cookies.has(COOKIE);

  try {
    const views = seen
      ? ((await redis.get<number>(KEY)) ?? 0)
      : await redis.incr(KEY);

    const res = NextResponse.json({ views });

    if (!seen) {
      res.cookies.set(COOKIE, "1", {
        maxAge: ONE_YEAR,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
    }

    return res;
  } catch (error) {
    console.error("Failed to read view count:", error);
    return NextResponse.json({ error: "Unavailable" }, { status: 500 });
  }
}
