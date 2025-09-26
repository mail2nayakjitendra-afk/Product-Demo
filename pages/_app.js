import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#0ea5a4" />
      </Head>
      <Header />
      <div className="app-content">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  )
}
