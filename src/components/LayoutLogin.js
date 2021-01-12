import React from 'react'

import HeaderLogin from './HeaderLogin'
import Footer from './Footer'

const LayoutLogin = ({ children }) => (
  <>
    <HeaderLogin />
    {children}
    <Footer />
  </>
)

export default LayoutLogin
