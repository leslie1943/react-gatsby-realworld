import React from 'react'

import HeaderLogin from './HeaderLogin'
import Footer from './Footer'
const LayoutLogin = ({ children }) => {
  return (
    <>
      <HeaderLogin />
      {children}
      <Footer />
    </>
  )
}

export default LayoutLogin
