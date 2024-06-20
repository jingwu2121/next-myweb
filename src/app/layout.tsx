import type { Metadata } from "next";
import "./styles/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jing Wu",
  description: "3D Vision, PhD Student, Oxford",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
