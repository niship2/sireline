//import '../styles/globals.css'
//function MyApp({ Component, pageProps }) {
//  return <Component {...pageProps} />
//}
//export default MyApp


import Layout from '../components/layout'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}