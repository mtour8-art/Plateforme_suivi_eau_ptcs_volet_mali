export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const email = process.env.ADMIN_EMAIL || "gireexpert@gmail.com";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_PASSWORD manquant dans les variables Vercel." },
      { status: 400 }
    );
  }

  const creation = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (
    creation.error &&
    !creation.error.message.toLowerCase().includes("already")
  ) {
    return NextResponse.json(
      { ok: false, error: creation.error.message },
      { status: 500 }
    );
  }

  const { data: listeUtilisateurs } =
    await supabaseAdmin.auth.admin.listUsers();

  const adminUser = listeUtilisateurs?.users?.find(
    (u: any) => u.email === email
  );

  if (!adminUser) {
    return NextResponse.json(
      { ok: false, error: "Utilisateur administrateur introuvable." },
      { status: 500 }
    );
  }

  const { data: role } = await supabaseAdmin
    .from("roles")
    .select("id")
    .eq("nom_role", "Administrateur PTCS")
    .single();

  if (!role?.id) {
    return NextResponse.json(
      { ok: false, error: "Rôle Administrateur PTCS introuvable. Exécuter seed.sql." },
      { status: 500 }
    );
  }

  const { error } = await supabaseAdmin.from("profils").upsert(
    {
      id: adminUser.id,
      email,
      role_id: role.id,
      actif: true,
    },
    { onConflict: "id" }
  );

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    email,
    message: "Administrateur créé/confirmé et rôle attribué.",
  });
}
