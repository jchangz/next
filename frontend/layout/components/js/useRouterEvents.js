import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { RouteContext } from '../../../context/routeContext'

export default function useRouterEvents() {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(null)
  const [routeLoaded, setRouteLoaded] = useState(false)
  const { dispatchRoute } = useContext(RouteContext)

  useEffect(() => {
    const setLoading = (url) => {
      const arr = url.split('/')
      const lastUrl = arr[arr.length - 1]
      dispatchRoute({ type: 'setLiveClose' })
      if (url === '/') {
        document.body.style.overflow = 'auto'
        setSelectedImage(null)
        dispatchRoute({ type: 'setRouteClose' })
      } else if (lastUrl === 'live') {
        dispatchRoute({ type: 'setRouteOpen' })
        dispatchRoute({ type: 'setLiveOpen' })
        document.body.style.overflow = 'hidden'
      } else {
        dispatchRoute({ type: 'setRouteOpen' })
        document.body.style.overflow = 'auto'
      }
    }
    const setLoaded = (url) => {
      if (url === '/') {
        setRouteLoaded(false)
      } else {
        setRouteLoaded(true)
      }
    }

    router.events.on('routeChangeStart', setLoading)
    router.events.on('routeChangeComplete', setLoaded)

    return () => {
      router.events.off('routeChangeStart', setLoading)
      router.events.off('routeChangeComplete', setLoaded)
    }
  }, [router, dispatchRoute])

  return { selectedImage, setSelectedImage, routeLoaded }
}
