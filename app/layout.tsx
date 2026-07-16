import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BoardroomAI",
  description:
    "A virtual Board of Directors that helps founders validate startup ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
