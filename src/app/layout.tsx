import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: "Notebook",
  description: "Research and learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased h-screen">
          <Providers>
            {children}
            <Toaster
              richColors
              icons={{
                loading: <Loader2 className="animate-spin" />,
              }}
            />
          </Providers>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
