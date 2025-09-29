import { supabase } from "@/lib/supabase";

export async function createWorkspace(name: string, userId: string) {
  const { data, error } = await supabase
    .from("workspaces")
    .insert([{ name, created_by: userId }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getWorkspaces() {
  const { data, error } = await supabase.from("workspaces").select();
  if (error) throw error;
  return data;
}
