import dynamic from 'next/dynamic'
import { useState, useContext, useEffect } from 'react'
import { useTransition, a } from 'react-spring'
import { RouteContext } from '../../../context/routeContext'
import styles from '../Component.module.css'

const Live = dynamic(() => import('../../../live/index'))
const PostLayout = dynamic(() => import('../../../layout/postLayout'))

export default function RouteContent({ children, routeLoaded }) {
  const { stateRoute, dispatchRoute } = useContext(RouteContext)
  const { isRouteOpen, isLiveOpen } = stateRoute
  const [post, setPost] = useState(null)
  const [preventTransition, setPreventTransition] = useState(null)

  useEffect(() => {
    if (isRouteOpen && post) {
      dispatchRoute({ type: 'setPostLoaded' })
      window.scrollTo(0, 0)
      setTimeout(() => {
        setPreventTransition(true)
      }, 1)
    } else {
      setPreventTransition(false)
    }
  }, [isRouteOpen, post, dispatchRoute])

  useEffect(() => {
    if (routeLoaded && isRouteOpen && !isLiveOpen && children.props.post) {
      setPost(children.props.post)
    }
    if (!routeLoaded) {
      setPost(null)
    }
  }, [isRouteOpen, children.props, routeLoaded, isLiveOpen])

  const transitionsRoute = useTransition(isRouteOpen && !isLiveOpen && post, null, {
    from: { transform: preventTransition ? 'translate3d(-100%,0%,0) scale(0.5)' : 'translate3d(0%,0%,0) scale(1)' },
    enter: { transform: 'translate3d(0%,0%,0) scale(1)' },
    leave: { transform: 'translate3d(-100%,0%,0) scale(0.8)' },
  })
  const transitionsLive = useTransition(isLiveOpen, null, {
    from: { transform: 'translate3d(100%,0%,0) scale(0.8)' },
    enter: { transform: 'translate3d(0%,0%,0) scale(1)' },
    leave: { transform: 'translate3d(100%,0%,0) scale(0.8)' },
  })

  return (
    <>
      <div className={isRouteOpen ? `${styles.content}  ${styles.active}` : `${styles.content}`}>
        {transitionsLive.map(({ item, key, props }) => item && (
          <a.div
            className={styles.livecontainer}
            style={props}
            key={key}
          >
            <Live />
          </a.div>
        ))}
        {transitionsRoute.map(({ item, key, props }) => item && (
          <a.div
            className={isRouteOpen ? styles.posRelative : styles.posAbsolute}
            style={props}
            key={key}
          >
            {post ? <PostLayout post={post} /> : null}
          </a.div>
        ))}
        {isRouteOpen ? null : children}
      </div>
    </>
  )
}
