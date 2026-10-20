import { createAdminClient } from "@supabase/server/core";

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL ?? process.env.SUPABASE_URl;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error("Supabase server credentials are not configured");
  }

  return createAdminClient({
    env: {
      url,
      secretKeys: { default: secretKey },
    },
  });
}
