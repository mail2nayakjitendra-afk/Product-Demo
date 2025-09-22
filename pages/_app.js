import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div className="app-content">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  )
}
