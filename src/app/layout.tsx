import type { Metadata } from 'next';
import Header from '@components/layouts/Header';
import Footer from '@components/layouts/Footer';
import { UserProvider } from '@/context/userContext';
import { auth } from '@lib/auth';

import '@/styles/globals.css';
import '@/styles/scss/main.scss';
// import { Geist, Geist_Mono } from "next/font/google";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang='en'>
      <body className={` antialiased`}>
        <UserProvider>
          <Header session={session} />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
