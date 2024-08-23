"use client";
import ConvexClientProvider from "./convex-client";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </ThemeProvider>
  );
}
