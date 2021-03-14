import Link from 'next/link'
import {
  useState, useEffect, useContext, useRef,
} from 'react'
import { useSprings, a } from 'react-spring'
import { RouteContext } from '../../../context/routeContext'
import styles from '../Component.module.css'

export default function ImageView({ ...props }) {
  const { selectedImage, setSelectedImage } = props
  const [scrollPositionY, setScrollPositionY] = useState(null)
  const { stateRoute } = useContext(RouteContext)
  const { isRouteOpen, isPostLoaded, posts } = stateRoute
  const imageList = useRef()
  const imageTransform = useRef()

  const selectRoute = (e) => {
    const target = e.target.dataset
    const index = parseInt(target.index, 10)
    setScrollPositionY(window.scrollY)
    imageTransform.current = window.scrollY - e.target.parentElement.offsetTop
    setSelectedImage(index)
  }

  useEffect(() => {
    if (!isRouteOpen) {
      window.scrollTo(0, scrollPositionY)
    }
  }, [isRouteOpen, scrollPositionY])

  const setSpringsTransform = (i) => {
    switch (selectedImage) {
      case null:
        return 'translateY(0px) scale(1)'
      case i:
        return `translateY(${imageTransform.current}px) scale(1.2)`
      default:
        return 'translateY(0px) scale(0)'
    }
  }
  const setSpringsOpacity = (i) => {
    switch (selectedImage) {
      case null:
        return 1
      case i:
        return 1
      default:
        return 0
    }
  }

  const springs = useSprings(posts.length, posts.map((item, i) => ({
    config: { mass: 1, tension: 200, friction: 20 },
    transform: setSpringsTransform(i),
    opacity: setSpringsOpacity(i),
  })))

  return (
    <>
      <ul
        className={isPostLoaded ? `${styles.container}  ${styles.active}` : `${styles.container}`}
        ref={imageList}
      >
        {springs.map(({ opacity, transform }, i) => (
          <a.li
            className={isRouteOpen && selectedImage === i ? styles.hero : null}
            style={{ transform, opacity }}
            key={i}
          >
            <Link
              href={`/posts/${posts[i].slug}`}
              scroll={false}
            >
              <a
                data-index={i}
                role="button"
                tabIndex="0"
                aria-label={`${posts[i].title}`}
                onClick={selectRoute}
                onKeyDown={selectRoute}
              >
                <span>{posts[i].title}</span>
              </a>
            </Link>
            <div
              className={styles.card}
              style={{ background: posts[i].hero }}
            >
              {isRouteOpen && selectedImage === i
                ? null : <h2>{posts[i].title}</h2>}
            </div>
          </a.li>
        ))}
      </ul>
    </>
  )
}
