import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/components/session-provider";

export const metadata: Metadata = {
  title: "VitaLens | Personal Vitamin Suggester",
  description:
    "Personal vitamin suggestions that separate fat-soluble and water-soluble vitamins by age and gender.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
