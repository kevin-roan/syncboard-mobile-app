import { supabase } from "@/lib/supabase";

export async function createTask(payload: {
  name: string;
  project_id: string;
  created_by: string;
  status?: string;
}) {
  const insertData = { ...payload };
  if (insertData.status === undefined) {
    delete insertData.status;
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert([insertData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTasks(projectId: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select()
    .eq("project_id", projectId);

  if (error) throw error;
  return data;
}

export async function getDueTaskCount(workspaceId: string) {
  const { count, error } = await supabase
    .from("tasks")
    .select(`project:projects(id, workspace_id)`, {
      count: "exact",
      head: true,
    })
    .eq("status", "todo")
    .eq("project.workspace_id", workspaceId);

  if (error) throw error;

  return count || 0;
}

export async function updateTaskStatus(taskId: string, status: string) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", taskId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteTaskById(taskId: string) {
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);
  if (error) throw error;
  return data;
}
