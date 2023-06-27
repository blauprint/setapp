import "@/styles/globals.css";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { AppProps } from "next/app";
import HomeNavigationBar from "@/components/HomeNavigationBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
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
  );
}
