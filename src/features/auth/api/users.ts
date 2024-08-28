import { useQueryWithStatus } from "@/services/convex-query";
import { api } from "@convex/api";

export const useUser = () => {
  const {
    data: user,
    isPending,
    error,
    isError,
  } = useQueryWithStatus(api.user.query.getCurrentUser);

  return {
    user: user,
    isLoading: isPending,
    error: isError ? error : null,
    isAuthenticated: !!user,
  };
};
