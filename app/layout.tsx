import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { combine } from "@/utils/combineClassNames";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProtectedRoute from "@/components/protectedRoute";
import Container from "@/components/container";

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
      <body className={combine(inter.className, "min-h-screen h-full")}>
        <ProtectedRoute>
          <Header />
          <main >
            <Container fullHeight>
              <Toaster position="top-center" />
              {children}
            </Container>
          </main>
          <Footer text="Made with 💙 by 🍫"/>
        </ProtectedRoute>
      </body>
    </html>
  );
}
