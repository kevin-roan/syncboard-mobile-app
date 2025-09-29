import { supabase } from "@/lib/supabase";

export interface CommentInput {
  content: string;
  user_id: string;
}

export async function createCommentByTaskId(
  taskId: string,
  comment: CommentInput,
) {
  const insertData = {
    task_id: taskId,
    content: comment.content,
    created_by: comment.user_id,
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
    .channel(`task-comments-${taskId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "comments",
        filter: `task_id=eq.${taskId}`,
      },
      (payload) => {
        // console.log("Realtime payload:", payload);
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

export async function getTaskCommentDetailsByCommentId(commentId: string) {
  const { data, error } = await supabase
    .from("comment_details")
    .select("*")
    .eq("id", commentId)
    .single();
  if (error) throw error;
  return data;
}
