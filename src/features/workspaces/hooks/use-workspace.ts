import { useWorkspaceQuery } from "../api/query";

export const useWorkspace = () => {
  const { useGetWorkspaces } = useWorkspaceQuery();
  const {
    error: getWorkspacesError,
    isError: isGetWorkspacesError,
    isPending: isGetWorkspacesPending,
    workspaces,
  } = useGetWorkspaces();

  const getWorkspaces = () => {
    return {
      workspaces,
      isPending: isGetWorkspacesPending,
      isError: isGetWorkspacesError,
      error: getWorkspacesError,
    };
  };

  return {
    getWorkspaces,
  };
};
