import { Metadata } from "next";
import { Roboto } from "next/font/google";
const font = Roboto({ subsets: ["latin"], weight: "400" });

export function generateMetadata({
  params: { username },
}: {
  params: { username: string };
}): Metadata {
  return {
    title: username,
  };
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={font.className}>{children}</div>;
}
