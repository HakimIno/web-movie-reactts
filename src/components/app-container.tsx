import { BrowserRouter } from 'react-router-dom'

import { Body } from '../layouts/body'
import { Footer } from '../layouts/footer'
import { Header } from '../layouts/header'

export const AppContainer = () => {
  return (
    <BrowserRouter>
      {/* Header */}
      <Header />
      {/* Body */}
      <Body />
      {/* Footer */}
      <Footer />
    </BrowserRouter>
  )
}
