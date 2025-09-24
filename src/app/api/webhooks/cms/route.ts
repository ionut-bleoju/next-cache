import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

type WebhookPayload = {
  page: string;
};

const CF_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const PUBLIC_APP_URL = process.env.BETTER_AUTH_URL;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

async function purgeCloudflare(urls: string[]) {
  if (!CF_ZONE_ID || !CF_API_TOKEN) return;

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ files: urls }),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Cloudflare purge failed: ${res.status} ${text}`);
  }
}

export async function POST(req: NextRequest) {
  const provided = new URL(req.url).searchParams.get("secret");
  if (!WEBHOOK_SECRET || provided !== WEBHOOK_SECRET) {
    return NextResponse.json(
      { ok: false, error: "unauthorized" },
      { status: 401 }
    );
  }

  let payload: Partial<WebhookPayload> = {};
  try {
    payload = (await req.json()) as Partial<WebhookPayload>;
  } catch (_) {
    return NextResponse.json(
      { ok: false, error: "unauthorized" },
      { status: 400 }
    );
  }

  const page = payload.page;
  const normalizedPath = page
    ? page.startsWith("/")
      ? page
      : `/${page}`
    : "/";

  try {
    revalidatePath(normalizedPath);
  } catch (_) {
    return NextResponse.json(
      { ok: false, error: "revalidation failed" },
      { status: 502 }
    );
  }

  const base = (PUBLIC_APP_URL || "").replace(/\/$/, "");
  const urls: string[] = [];

  if (base) {
    const absolute =
      normalizedPath.startsWith("http://") ||
      normalizedPath.startsWith("https://")
        ? normalizedPath
        : `${base}${
            normalizedPath.startsWith("/") ? "" : "/"
          }${normalizedPath}`;
    urls.push(absolute);
  }

  try {
    if (urls.length > 0) {
      await purgeCloudflare(urls);
    }
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    revalidated: { path: normalizedPath },
    purged: urls,
  });
}

export const dynamic = "force-dynamic"; // ensure this handler is always dynamic
