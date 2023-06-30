import "@/styles/globals.css";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { AppProps } from "next/app";
import HomeNavigationBar from "@/components/HomeNavigationBar";
import { ThemeProvider } from 'next-themes';
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <ThemeProvider>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        {...pageProps}
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "#ffa41b",
            colorText: "white",
          },
        }}
      >
        <Provider store={store}>
          <HomeNavigationBar />
          <Component {...pageProps} />
        </Provider>
      </ClerkProvider>
    </ThemeProvider>
  );
}