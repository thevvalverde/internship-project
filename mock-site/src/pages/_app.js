import Layout from "../components/Layout";
import "../styles/App.css";
import "../styles/index.css";
import "../styles/styles.css";


export default function App({Component, pageProps}) {

    // console.log("PAGEPROPS: " + pageProps);

    return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        revalidate: 1,
    }
}
