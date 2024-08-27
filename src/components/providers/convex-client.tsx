"use client";

import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { SessionProvider } from "convex-helpers/react/sessions";
import { ConvexQueryCacheProvider } from "convex-helpers/react/cache";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
});
convexQueryClient.connect(queryClient);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConvexAuthNextjsProvider client={convex}>
      <SessionProvider>
        <ConvexQueryCacheProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ConvexQueryCacheProvider>
      </SessionProvider>
    </ConvexAuthNextjsProvider>
  );
}
