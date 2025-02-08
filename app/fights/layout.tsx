import { FightsProvider } from "@/context/fightsContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <FightsProvider>
            {children}
        </FightsProvider>
    );
}