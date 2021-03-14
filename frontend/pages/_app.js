/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import MyLayout from '../layout/homeLayout'
import { RouteProvider } from '../context/routeContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--min-height', `${window.innerHeight}px`)
  }, [])

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
