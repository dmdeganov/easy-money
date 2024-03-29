import type {Metadata} from 'next';
import Head from 'next/head';
import {Inter} from 'next/font/google';
import '@/styles/main.scss';
import WindowSizeContextProvider from '@/app/WindowSizeContextProvider';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" data-font_weightiness="thinner">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>
      <WindowSizeContextProvider>
        <body className={inter.className}>
          {children}
          <div id="portal" />
        </body>
      </WindowSizeContextProvider>
    </html>
  );
}
