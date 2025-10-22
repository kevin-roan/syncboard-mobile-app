import { useMutation, useQuery } from '@tanstack/react-query';

import { MINUTE } from '@/constants/time';
import { getTasks, updateTaskStatus } from '@/services/task';
import { queryClient } from '@/utils/queryClient';
import { Status } from '@/types/status';

const useGetTasks = (projectId?: string) =>
  useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => getTasks(projectId!),
    enabled: !!projectId,
    staleTime: 5 * MINUTE,
    gcTime: 1 * MINUTE,
  });

const useUpdateTaskStatus = (projectId: string) => {
  return useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: Status }) =>
      updateTaskStatus(taskId, status),
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(['tasks', projectId], (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.map((task: any) => (task.id === updatedTask.id ? updatedTask : task));
      });
    },
  });
};

export { useGetTasks, useUpdateTaskStatus };
