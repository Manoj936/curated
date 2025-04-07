import "./globals.css";
import { Inter } from "next/font/google";

import Script from "next/script";
import Providers from "./components/providers";
import Header from "./components/Header";
import { Poppins } from "next/font/google";
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // optional weights
});

export const metadata = {
  title: "ImageKit Next.js Integration",
  description: "Demo of ImageKit integration with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
