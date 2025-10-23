import { useMutation, useQuery } from '@tanstack/react-query';

import { MINUTE } from '@/constants/time';
import { getTasks, updateTask } from '@/services/task';
import { queryClient } from '@/utils/queryClient';
import { Task } from '@/types/task';

const useGetTasks = (projectId?: string) =>
  useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => getTasks(projectId!),
    enabled: !!projectId,
    staleTime: 5 * MINUTE,
    gcTime: 1 * MINUTE,
  });

const useUpdateTask = (projectId: string) => {
  return useMutation({
    mutationFn: ({ taskId, updates }: { taskId: string; updates: Partial<Task> }) =>
      updateTask(taskId, updates),
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(['tasks', projectId], (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.map((task: any) => (task.id === updatedTask.id ? updatedTask : task));
      });
    },
  });
};

export { useGetTasks, useUpdateTask };
