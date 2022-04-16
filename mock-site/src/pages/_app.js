import { Fragment } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/system";
import Layout from "../components/Layout"
import "../styles/App.css";
import "../styles/styles.css"
import "../styles/index.css"
import {CookiesProvider} from "react-cookie"


export default function App({Component, pageProps}) {

    // console.log("PAGEPROPS: " + pageProps);

    return (
      <CookiesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    )
}