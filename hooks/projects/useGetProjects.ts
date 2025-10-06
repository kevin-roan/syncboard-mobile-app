import { useQuery } from '@tanstack/react-query';

import { MINUTE } from '@/constants/time';
import { getProjects } from '@/services/projects';

const useGetProjects = (workspaceId?: string) =>
  useQuery({
    queryKey: ['projects', workspaceId],
    queryFn: () => getProjects(workspaceId),
    enabled: !!workspaceId,
    staleTime: 5 * MINUTE,
    gcTime: 1 * MINUTE,
  });

export { useGetProjects };
