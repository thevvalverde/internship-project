import '../styles/styles.css'

export default function App({Component, pageProps}) {

    console.log("PAGEPROPS: " + pageProps);

    return <Component {...pageProps} />
}