import "@/styles/globals.css";
import BackofficeProvider from "@/contexts/BackofficeContext";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import OrderProvider from "@/contexts/OrderContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <BackofficeProvider>
        <OrderProvider>
          <Component {...pageProps} />
        </OrderProvider>
      </BackofficeProvider>
    </SessionProvider>
  );
}
