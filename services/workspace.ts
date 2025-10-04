import { supabase } from '@/lib/supabase';

export async function createWorkspace(name: string, userId: string) {
  const { data, error } = await supabase
    .from('workspaces')
    .insert([{ name, created_by: userId }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// get workspaces that the auth user is in. (rls enabled)
export async function getUserWorkspaces(userId: string) {
  const { data, error } = await supabase
    .from('workspace_members')
    .select('workspace_id, workspaces(*)')
    .eq('user_id', userId);
  if (error) throw error;
  return data.map((item) => item.workspaces);
}
