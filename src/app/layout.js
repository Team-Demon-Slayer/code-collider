import { Inter } from "next/font/google";
import "./globals.css";
import SideNav from "@/component/nav/(sideNav)/page";
import TopNav from "@/component/nav/(topNav)/page";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Code Collider",
  description:
    "Code Collider is a platform for finding collaborators for coding projects. Learn and grow together with other engineers, uplevel skills, and build your project portfolio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <TopNav />
      <SideNav />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
