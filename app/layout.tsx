import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { MenuSyncProvider } from "@/providers/MenuSyncProvider";

export const metadata: Metadata = {
  title: "MenuSync Copilot",
  description: "P0 prototype for chat-approved restaurant menu updates"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MenuSyncProvider>
          <AppShell>{children}</AppShell>
        </MenuSyncProvider>
      </body>
    </html>
  );
}
