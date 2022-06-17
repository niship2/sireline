import Navbar from './navbar'
import Footer from './footer'
import AmpSidebar from './ampsidebar'


export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      
      <main>{children}<AmpSidebar /></main>
      <Footer />
    </>
  )
}