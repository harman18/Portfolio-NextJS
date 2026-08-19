import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

function getBrowser(ua: string): string {
  if (/Edg\//.test(ua)) return "Edge " + (ua.match(/Edg\/(\d+)/)?.[1] ?? "");
  if (/OPR\//.test(ua)) return "Opera " + (ua.match(/OPR\/(\d+)/)?.[1] ?? "");
  if (/Firefox\//.test(ua)) return "Firefox " + (ua.match(/Firefox\/(\d+)/)?.[1] ?? "");
  if (/Chrome\//.test(ua)) return "Chrome " + (ua.match(/Chrome\/(\d+)/)?.[1] ?? "");
  if (/Safari\//.test(ua)) return "Safari " + (ua.match(/Version\/(\d+)/)?.[1] ?? "");
  return "Unknown";
}

function getOS(ua: string): string {
  if (/Windows NT 10/.test(ua)) return "Windows 10/11";
  if (/Windows/.test(ua)) return "Windows";
  if (/Mac OS X/.test(ua)) return "macOS";
  if (/Android/.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
  if (/Linux/.test(ua)) return "Linux";
  return "Unknown";
}

export async function GET(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  const xff = req.headers.get("x-forwarded-for");
  const ip = xff
    ? xff.split(",")[0].trim()
    : (req.headers.get("x-real-ip") ?? "unknown");
  const host = req.headers.get("host") ?? "unknown";
  const language = (req.headers.get("accept-language") ?? "unknown")
    .split(",")[0]
    .trim();
  const referrer = req.headers.get("referer") ?? "";

  return Response.json({
    ip,
    host,
    browser: getBrowser(ua),
    os: getOS(ua),
    language,
    referrer: referrer || "direct",
  });
}
