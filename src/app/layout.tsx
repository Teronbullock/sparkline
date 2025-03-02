import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from "next/font/google";
import Header from '@components/layouts/Header';
import Footer from '@components/layouts/Footer';
import { UserProvider } from '@/app/context/userContext';

import './globals.css';
import './styles/main.scss';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: 'SparkLine',
  description: 'Track your fitness goals with SparkLine',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={` antialiased`}>
        <UserProvider>
          <Header />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
