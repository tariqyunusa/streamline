import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

const Layout   = ({children} : any) => {
  return (
    <div>
        <Nav />
        <main>{children}</main>
        <Footer />      
    </div>
  )
}

export default Layout
