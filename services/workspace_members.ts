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

export async function getWorkspaceMemberCount(workspaceId: string) {
  const { count, error } = await supabase
    .from("workspace_users")
    .select("*", {
      count: "exact",
      head: true, // no rows are returned
    })
    .eq("workspace_id", workspaceId);
  if (error) throw error;
  return count;
}
