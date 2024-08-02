import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/custom.scss";
import Providers from "./Providers";
import Pills from "../components/Pills/Pills";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Password Manager",
  description: "Aplicacion de practica para aprender Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body className={inter.className}>
        <Providers>
          {" "}
          <div
            style={{
              minHeight: "100vh",
            }}
            className="d-flex flex-column"
          >
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
