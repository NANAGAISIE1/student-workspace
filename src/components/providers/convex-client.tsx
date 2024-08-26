"use client";

import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { SessionProvider } from "convex-helpers/react/sessions";
import { ConvexQueryCacheProvider } from "convex-helpers/react/cache";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConvexAuthNextjsProvider client={convex}>
      <SessionProvider>
        <ConvexQueryCacheProvider>{children}</ConvexQueryCacheProvider>
      </SessionProvider>
    </ConvexAuthNextjsProvider>
  );
}
