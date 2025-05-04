import type { Metadata } from "next";
import "@themes/global.scss";

export const metadata: Metadata = {
  title: "Rifqi Finaldy - Entry Test",
  description: "Rifqi Finaldy Y-Ventures Entry Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <h1>Rifqi Finaldy</h1>
        {children}
      </body>
    </html>
  );
}
