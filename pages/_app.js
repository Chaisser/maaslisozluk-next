import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import { wrapper } from "../store/store";
import { ApolloProvider } from "@apollo/react-hooks";
import getClient from "./../apollo/apollo";
import "../styles/globals.css";
import Cookies from "js-cookie";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const App = ({ Component, pageProps }) => {
  const token = Cookies.get("token") ? Cookies.get("token") : null;
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ApolloProvider client={getClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};
export default wrapper.withRedux(App);
