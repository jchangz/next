import React, { useContext, useRef } from "react"
import { useSprings, a } from 'react-spring'
import { useRouter } from 'next/router'
import { RouteContext } from "../../../context/routeContext"
import styles from '../Component.module.css'

export default function ImageView({ ...props }) {
    const { stateRoute, dispatchRoute } = useContext(RouteContext);
    const router = useRouter()
    const imageContainer = useRef()
    const imageTransform = useRef()

    const selectRoute = (e) => {
        const target = e.target.dataset

        const index = parseInt(target.index)
        const route = target.title
        imageTransform.current = imageContainer.current.scrollTop - e.target.offsetTop

        router.push(`/posts/${route}`)
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
            <div className={styles.container}
                ref={imageContainer} >
                {springs.map(({ opacity, transform }, i) => (
                    <a.div
                        style={{ transform, opacity }}
                        onClick={selectRoute}
                        data-title={stateRoute.posts[i].slug}
                        data-index={i}
                        key={i}>
                        <div className={styles.card}
                            style={{ background: stateRoute.posts[i].hero }}>
                        </div>
                    </a.div>
                ))}
            </div>
        </>
    )
}