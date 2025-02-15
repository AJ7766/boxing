import { rajdhani } from "@/fonts/fonts";
import "./globals.css";
import { Nav } from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rajdhani.className} antialiased overflow-x-hidden`}>
        <Nav />
        <Hero />
        {children}
        <Footer />
      </body>
    </html>
  );
}
