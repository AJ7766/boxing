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

const test = async () => {
  const url = `${process.env.API_URL}/v1/fights/?page_num=1&page_size=100`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.API_KEY as string,
      'x-rapidapi-host': process.env.API_HOST as string
    }
  };

  const res = await fetch(url, options);
  const fights = await res.json();

  console.log("Status:", res.statusText)
  for (let i = 0; i < fights.length; i++) {
    const fight = fights[i];
    fight.event.broadcasters.map((broadcast: any) => {
      const [country, network] = Object.entries(broadcast)[0];

      console.log(`Country: ${country}, Network: ${network}`);
    })
    if (fight.results) {
      console.log("Result:", fight.results);
    }
  }
}