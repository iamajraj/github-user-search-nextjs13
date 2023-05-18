import { Metadata } from "next";
import "./globals.css";
import { Dekko } from "next/font/google";
const font = Dekko({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: {
    default: "Search Github Users",
    template: "%s | User",
  },
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
