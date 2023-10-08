import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header/Header";
import HomeButton from "./components/HomeButton/HomeButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Challlenges",
  description: "Solving react challenges that i see online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{ backgroundColor: "black", color: "white" }}
        className={inter.className}
      >
        {children}
        <HomeButton />
      </body>
    </html>
  );
}
