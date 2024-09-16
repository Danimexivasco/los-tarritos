import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { combine } from "@/utils/combineClassNames";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProtectedRoute from "@/components/protectedRoute";

const inter = Inter({ subsets: [ "latin" ] });

export const metadata: Metadata = {
  title: "Nuestros Tarritos 🏺",
  description: "Una app canorranquica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={combine(inter.className, "min-h-screen")}>
        <ProtectedRoute>
          <Header />
          <main className="min-h-[calc(100vh-7rem)] md:min-h-[calc(100vh-7.5rem)] justify-between p-6 lg:p-12">
            <Toaster position="top-center" />
            {children}
          </main>
          <Footer text="Made with 💙 by 🍫"/>
        </ProtectedRoute>
      </body>
    </html>
  );
}
