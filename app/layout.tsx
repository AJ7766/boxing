import { rajdhani } from "@/fonts/fonts";
import "./globals.css";
import { Nav } from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer";
import { ScrollUp } from "@/components/ScrollUp";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rajdhani.className} bg-white text-black antialiased overflow-x-hidden`}>
        <Nav />
        {children}
        <Footer />
        <ScrollUp />
      </body>
    </html>
  );
}