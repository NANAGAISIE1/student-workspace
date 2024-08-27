import { useWorkspaceQuery } from "../api/query";

export const useWorkspace = () => {
  const { useGetWorkspaces } = useWorkspaceQuery();
  const getWorkspaces = () => {
    const { error, isError, isPending, isSuccess, workspaces } =
      useGetWorkspaces();

    return {
      workspaces,
      isPending,
      isError,
      isSuccess,
      error,
    };
  };

  return {
    getWorkspaces,
  };
};
