import { useQuery } from '@tanstack/react-query';
import { getUserWorkspaces } from '@/services/workspace';
import { DEF_STALETIME, MINUTE } from '@/constants/time';
import { getWorkspaceUsers } from '@/services/workspace_members';

const useGetUserWorkspaces = (userId: string) => {
  return useQuery({
    queryKey: ['dashboard', userId],
    queryFn: () => getUserWorkspaces(userId),
    enabled: !!userId,
    staleTime: 5 * MINUTE,
    gcTime: DEF_STALETIME,
  });
};

const useGetWorkspaceMemberList = (workspaceId: string) => {
  return useQuery({
    queryKey: ['dashboard', workspaceId],
    queryFn: () => getWorkspaceUsers(workspaceId),
    enabled: !!workspaceId,
    staleTime: 5 * MINUTE,
    gcTime: DEF_STALETIME,
  });
};

export { useGetUserWorkspaces, useGetWorkspaceMemberList };
