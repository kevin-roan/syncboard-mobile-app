import { supabase } from "@/lib/supabase";

type WorkspaceUser = {
  user_id: string;
  username: string | null;
  email: string | null;
};

export async function getWorkspaceUsers(
  workspaceId: string,
): Promise<WorkspaceUser[]> {
  const { data, error } = await supabase
    .from("workspace_users")
    .select("*")
    .eq("workspace_id", workspaceId);
  if (error) throw error;
  return data;
}
