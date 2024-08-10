import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            richColors
            icons={{
              loading: <Loader2 className="animate-spin" />,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
