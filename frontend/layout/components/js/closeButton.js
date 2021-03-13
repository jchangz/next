import Link from 'next/link'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { RouteContext } from '../../../context/routeContext'
import styles from '../Component.module.css'

export default function CloseButton() {
  const router = useRouter()
  const { stateRoute } = useContext(RouteContext)
  const { isRouteOpen, isRouteImmediate, isLiveOpen } = stateRoute

  const setLink = () => {
    switch (isLiveOpen) {
      case false:
        return '/'
      default:
        return `/posts/${router.query.slug}`
    }
  }

  return (
    <>
      {isRouteOpen && (!isRouteImmediate || isLiveOpen) ? (
        <Link href={setLink()} scroll={false}>
          <a className={styles.close}>
            <span>Close</span>
          </a>
        </Link>
      )
        : null}
    </>
  )
}
