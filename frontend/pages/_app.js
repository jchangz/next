import React from 'react'
import MyLayout from '../layout/homeLayout'
import { RouteProvider } from '../context/routeContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <RouteProvider>
        <MyLayout>
          <Component {...pageProps} />
        </MyLayout>
      </RouteProvider>
    </>
  )
}

export default MyApp
