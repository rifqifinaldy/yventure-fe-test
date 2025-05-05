import type { Metadata } from "next";
import "@themes/global.scss";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import Navbar from "@app/libs/components/navbar";
import { Ubuntu } from "next/font/google";

export const metadata: Metadata = {
  title: "Rifqi Finaldy - Entry Test",
  description: "Rifqi Finaldy Y-Ventures Entry Test",
};

const ubuntu = Ubuntu({
  variable: "--font-ubuntu-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={`${ubuntu.className}`}>
          <ToastContainer
            closeButton={false}
            style={{
              fontSize: "14px",
            }}
          />
          <Navbar />
          <div className="layout">{children}</div>
        </body>
      </StoreProvider>
    </html>
  );
}
