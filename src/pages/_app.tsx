import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import HomeNavigationBar from '@/components/HomeNavigationBar';

export default function App({ Component, pageProps }: AppProps) {
  return(
  <>
    <HomeNavigationBar/>
    <Component {...pageProps} />
  </>
  ) 
}
