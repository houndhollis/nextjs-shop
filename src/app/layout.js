import './globals.css';
import { Inter } from 'next/font/google';
import ToastProvider from '@/components/toastProvider/ToastProvider';
import Footer from '@/layouts/footer/Footer';
import Header from '@/layouts/header/Header';
import Providers from '@/redux/provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header/>
          <ToastProvider/>
          {children}
          <Footer/>
        </Providers>
      </body>
    </html>
  )
}
