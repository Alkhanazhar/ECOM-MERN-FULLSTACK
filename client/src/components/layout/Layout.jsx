import React from 'react'
import Footer from './footer/Footer'
import NavbarComponent from './navbar/Navbar'

const Layout = ({children}) => {
  return (
    <div className='App'>
    <header>
        <NavbarComponent />
    </header>
    <main className='main-container container'>
      {children}
    </main>
    <footer>
        <Footer />
    </footer>
    </div>
  )
}

export default Layout
