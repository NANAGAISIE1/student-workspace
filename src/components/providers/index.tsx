"use client";

import ConvexClientProvider from "./convex-client";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme";
import Modals from "../global-modal";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConvexClientProvider>
        {children}
        <Modals />
      </ConvexClientProvider>
    </ThemeProvider>
  );
}
