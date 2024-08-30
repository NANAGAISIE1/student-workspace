import { makeUseQueryWithStatus } from "convex-helpers/react";
import { useQueries } from "convex-helpers/react/cache";

export const useQueryWithStatus = makeUseQueryWithStatus(useQueries);
