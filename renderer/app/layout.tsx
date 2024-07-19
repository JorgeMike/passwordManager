import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/custom.scss";

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
        <div
          style={{
            minHeight: "100vh",
          }}
          className="d-flex flex-column"
        >
          {children}
        </div>
      </body>
    </html>
  );
}
