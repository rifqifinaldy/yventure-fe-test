import type { Metadata } from "next";
import "@themes/global.scss";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";

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
      <StoreProvider>
        <body>
          <ToastContainer />
          <h1>Rifqi Finaldy</h1>
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
