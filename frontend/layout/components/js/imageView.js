import { useContext, useRef } from 'react'
import { useSprings, a } from 'react-spring'
import { RouteContext } from '../../../context/routeContext'
import Link from 'next/link'
import styles from '../Component.module.css'

export default function ImageView({ ...props }) {
    const { stateRoute, dispatchRoute } = useContext(RouteContext);
    const imageList = useRef()
    const imageTransform = useRef()

    const selectRoute = (e) => {
        const target = e.target.dataset
        const index = parseInt(target.index)

        imageTransform.current = imageList.current.scrollTop - e.target.parentElement.offsetTop
        props.setSelectedImage(index)
        dispatchRoute({ type: 'setRouteOpen' })
    }

    const springs = useSprings(stateRoute.posts.length, stateRoute.posts.map((item, i) => ({
        config: { mass: 1, tension: 200, friction: 20 },
        transform: (props.selectedImage === null) ? "translateY(0px) scale(1)" :
            ((i !== props.selectedImage) ? "translateY(0px) scale(0.5)" :
                `translateY(${imageTransform.current}px) scale(1.2)`),
        opacity: (props.selectedImage === null) ? 1 : ((i !== props.selectedImage) ? 0 : 1)
    })))

    return (
        <>
            <ul className={styles.container}
                style={stateRoute.isRouteOpen ? { overflow: "hidden" } : null}
                ref={imageList} >
                {springs.map(({ opacity, transform }, i) => (
                    <a.li
                        className={stateRoute.isRouteOpen && props.selectedImage === i ? styles.hero : null}
                        style={{ transform, opacity }}
                        key={i}>
                        <Link href={`/posts/${stateRoute.posts[i].slug}`}>
                            <a data-index={i} onClick={selectRoute} />
                        </Link>
                        <div className={styles.card}
                            style={{ background: stateRoute.posts[i].hero }}>
                            {stateRoute.isRouteOpen && props.selectedImage === i ? null : <h2>{stateRoute.posts[i].title}</h2>}
                        </div>
                    </a.li>
                ))}
            </ul>
        </>
    )
}