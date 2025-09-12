import { supabase } from "@/lib/supabase";

export async function createTask(payload: {
  name: string;
  description?: string;
  project_id: string;
  created_by: string;
  assigned_to: string;
  status?: string;
}) {
  const insertData = { ...payload };
  if (insertData.status === undefined) {
    delete insertData.status;
  }
  if (insertData.description === undefined) {
    delete insertData.description;
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

export async function getTaskInfoById(taskId: string) {
  const { data, error } = await supabase
    .from("tasks_with_users")
    .select("*")
    .eq("id", taskId)
    .single();

  if (error) throw error;
  return data;
}

export interface CommentInput {
  text: string;
  author: string;
}

export async function createCommentByTaskId(
  taskId: string,
  comment: CommentInput,
) {
  const insertData = {
    task_id: taskId,
    content: comment.text,
    created_by: comment.author,
  };

  const { data, error } = await supabase
    .from("comments")
    .insert([insertData])
    .select();

  if (error) throw error;

  return data;
}

export function subscribeToTaskComments(
  taskId: string,
  onNewComment: (comment: any) => void,
) {
  const channel = supabase
    .channel(`task-comments-${taskId}`) // unique name is better
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "comments",
        filter: `task_id=eq.${taskId}`,
      },
      (payload) => {
        console.log("Realtime payload:", payload); // log everything
        if (payload.new) {
          onNewComment(payload.new);
        }
      },
    )
    .subscribe((status) => {
      console.log("Subscription status:", status);
    });

  return () => {
    console.log("Unsubscribing from comments channel");
    supabase.removeChannel(channel);
  };
}

export async function getTaskCommentsByTaskId(taskId: string) {
  const { data, error } = await supabase
    .from("comment_details")
    .select()
    .eq("task_id", taskId);

  if (error) throw error;
  console.log("data", data);
  return data;
}
