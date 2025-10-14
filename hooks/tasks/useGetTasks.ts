import { useQuery } from '@tanstack/react-query';

import { MINUTE } from '@/constants/time';
import { getTasks } from '@/services/task';

const useGetTasks = (projectId?: string) =>
  useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => getTasks(projectId),
    enabled: !!projectId,
    staleTime: 5 * MINUTE,
    gcTime: 1 * MINUTE,
  });

export { useGetTasks };
