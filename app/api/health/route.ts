export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { NextResponse } from "next/server";
import { hasSupabaseAdminEnv, supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const health: any = {
    app: "ok",
    time: new Date().toISOString(),
    supabase_env: hasSupabaseAdminEnv() ? "configured" : "missing"
  };

  if (!hasSupabaseAdminEnv()) {
    health.supabase = "not tested";
    return NextResponse.json(health);
  }

  try {
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Supabase timeout")), 7000));
    const query = supabaseAdmin.from("configuration").select("cle").limit(1);
    const result: any = await Promise.race([query, timeout]);
    health.supabase = result?.error ? `error: ${result.error.message}` : "ok";
  } catch (e: any) {
    health.supabase = `error: ${e.message}`;
  }

  return NextResponse.json(health);
}
