import { rajdhani } from "@/fonts/fonts";
import "./globals.css";
import { Nav } from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rajdhani.className} antialiased`}>
      <body>
        <Nav />
        <Hero />
        {children}
        <Footer />
      </body>
    </html>
  );
}
