import { supabase } from "@/lib/supabase";

export async function createInvitation(payload: {
  email: string;
  role?: string;
  workspaceId: string;
  invitedBy: string;
}) {
  const insertData: any = {
    email: payload.email,
    workspace_id: payload.workspaceId,
    invited_by: payload.invitedBy,
  };
  console.log("insert data", insertData);

  if (payload.role) {
    insertData.role = payload.role;
  }

  const { data, error } = await supabase
    .from("workspace_invitations")
    .insert([insertData])
    .select()
    .single();

  if (error) throw error;
  return data;
}
