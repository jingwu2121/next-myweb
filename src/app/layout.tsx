import type { Metadata } from "next";
import "./styles/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Ubuntu } from 'next/font/google'

const font = Ubuntu({ 
  weight: '400',
  subsets: ["latin"] 
});

export const metadata: Metadata = {
  title: "Jing Wu",
  description: "3D Computer Vision, PhD Student, Oxford",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
