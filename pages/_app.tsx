import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SchoolsProvider } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SchoolsProvider schools={pageProps.schools}>
      <Component {...pageProps} />
    </SchoolsProvider>
  );
}

export default MyApp;