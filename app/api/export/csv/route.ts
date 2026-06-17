export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
import { NextRequest, NextResponse } from "next/server";import { supabaseAdmin } from "@/lib/supabase-admin";import { toCsv } from "@/services/exports/csv";
const TABLES:Record<string,string>={pluviometrie:"observations_pluvio",piezometrie:"observations_piezo",limnimetrie:"observations_limni",points_eau:"points_eau"};
export async function GET(req:NextRequest){const module=req.nextUrl.searchParams.get("module")||"pluviometrie";const table=TABLES[module];if(!table)return NextResponse.json({ok:false,error:"Module invalide"},{status:400});const {data,error}=await supabaseAdmin.from(table).select("*").limit(10000);if(error)return NextResponse.json({ok:false,error:error.message},{status:500});return new NextResponse(toCsv(data||[]),{headers:{"Content-Type":"text/csv; charset=utf-8","Content-Disposition":`attachment; filename="${module}.csv"`}});}
