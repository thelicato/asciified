import "@asciified/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FontsProvider } from "@asciified/app/fonts";
import Header from "@asciified/app/header";
import Footer from "@asciified/app/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asciified",
  description: "ASCII Art API with a good-looking Web App.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <FontsProvider>{children}</FontsProvider>
        <Footer />
      </body>
    </html>
  );
}
