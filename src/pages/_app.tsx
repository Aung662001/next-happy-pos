import "@/styles/globals.css";
// import BackofficeProvider from "@/contexts/BackofficeContext";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
// import OrderProvider from "@/contexts/OrderContext";
import { store } from "@/store";
import { Provider } from "react-redux";
import { fetchAppData } from "@/store/slices/appSlice";
import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function App({ Component, pageProps }: AppProps) {
  const [selectedLoccationId] = useLocalStorage("locationId");
  useEffect(() => {
    store.dispatch(fetchAppData(selectedLoccationId));
  }, [selectedLoccationId]);
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
