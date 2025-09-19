import { supabase } from "@/lib/supabase";

export async function createProject(
  name: string,
  workspace_id: string,
  status?: string,
) {
  const { data, error } = await supabase
    .from("projects")
    .insert([{ name, workspace_id, ...(status && { status }) }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getProjects(workspace_id: string) {
  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("workspace_id", workspace_id);

  if (error) throw error;
  return data;
}

export async function getActiveProjects(workspaceId: string) {
  const { count, error } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("workspace_id", workspaceId);

  if (error) throw error;

  return count || 0;
}
