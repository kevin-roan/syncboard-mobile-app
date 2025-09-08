import { supabase } from "@/lib/supabase";

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", userId);

  if (error) throw error;
  return data;
}
