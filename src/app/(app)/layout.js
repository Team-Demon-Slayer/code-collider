import { Inter } from "next/font/google";
import "../globals.css";
import Nav from "./_components/nav/Nav.jsx";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Code Collider",
  description:
    "Code Collider is a platform for finding collaborators for coding projects. Learn and grow together with other engineers, uplevel skills, and build your project portfolio.",
};

export default function RootLayout({ children, showNav = true }) {
  return (
    <html lang="en">
      <body>
         <Nav />
        <section className={inter.className}>{children}</section>
      </body>
    </html>
  );
}
