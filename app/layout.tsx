import { rajdhani } from "@/fonts/fonts";
import "./globals.css";
import { Nav } from "@/components/Nav/_Nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rajdhani.className} antialiased`}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
