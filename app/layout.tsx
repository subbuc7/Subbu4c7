import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Subramanyam Reddy — Software Developer",
  description: "Cinematic portfolio of Subramanyam Reddy.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
