import "../styles/globals.css";
import makeStore from "./../store/store";
import withRedux from "next-redux-wrapper";
import App from "next/app";

let Page = ({ Component, pageProps }) => <Component {...pageProps} />;

Page.getInitialProps = async (appContext) => ({ ...(await App.getInitialProps(appContext)) });

Page = withRedux(makeStore)(Page);

export default Page;
