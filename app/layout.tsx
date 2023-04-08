import "./globals.css";
import { Dekko } from "next/font/google";
const font = Dekko({ subsets: ["latin"], weight: "400" });

export const metadata = {
    title: "Search Github Users",
    description: "An app for searching users of github by username",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={font.className}>{children}</body>
        </html>
    );
}
