import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SchoolsProvider } from "../store";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SchoolsProvider schools={pageProps.schools}>
      <Component {...pageProps} />
    </SchoolsProvider>
  );
}

export default appWithTranslation(MyApp);
